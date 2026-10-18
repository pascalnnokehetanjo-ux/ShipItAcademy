import { createClient } from '@/lib/supabase/server';
import { Course, Module, Lesson } from '@/types/database';

export interface RoadmapLesson extends Lesson {
  isCompleted: boolean;
  isNextLesson: boolean;
}

export interface RoadmapModule extends Module {
  lessons: RoadmapLesson[];
  completedLessonCount: number;
  totalLessonCount: number;
  progressPercentage: number;
}

export interface RoadmapData {
  course: Course;
  modules: RoadmapModule[];
  totalLessons: number;
  completedLessons: number;
  overallProgressPercentage: number;
  nextLesson: Lesson | null;
}

export async function getRoadmapData(userId: string): Promise<RoadmapData | null> {
  const supabase = await createClient();

  // 1. Fetch published course
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', 'build-publish-first-android-app')
    .eq('status', 'published')
    .single();

  if (!course) return null;

  // 2. Fetch modules and lessons
  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  if (!modules) return null;

  // 3. Fetch user's lesson progress
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', userId);

  const completedLessonIds = new Set(
    (progress || []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  let totalLessons = 0;
  let completedLessons = 0;
  let foundNext = false;
  let nextLesson: Lesson | null = null;

  const formattedModules: RoadmapModule[] = modules.map((mod: any) => {
    const sortedLessons: Lesson[] = (mod.lessons || [])
      .filter((l: Lesson) => l.status === 'published')
      .sort((a: Lesson, b: Lesson) => a.order_index - b.order_index);

    let modCompleted = 0;

    const lessonsWithStatus: RoadmapLesson[] = sortedLessons.map((lesson) => {
      totalLessons++;
      const isCompleted = completedLessonIds.has(lesson.id);

      if (isCompleted) {
        modCompleted++;
        completedLessons++;
      }

      let isNextLesson = false;
      if (!isCompleted && !foundNext) {
        isNextLesson = true;
        foundNext = true;
        nextLesson = lesson;
      }

      return {
        ...lesson,
        isCompleted,
        isNextLesson,
      };
    });

    const totalLessonCount = sortedLessons.length;
    const progressPercentage = totalLessonCount > 0 ? Math.round((modCompleted / totalLessonCount) * 100) : 0;

    return {
      ...mod,
      lessons: lessonsWithStatus,
      completedLessonCount: modCompleted,
      totalLessonCount,
      progressPercentage,
    };
  });

  const overallProgressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    course,
    modules: formattedModules,
    totalLessons,
    completedLessons,
    overallProgressPercentage,
    nextLesson,
  };
}
