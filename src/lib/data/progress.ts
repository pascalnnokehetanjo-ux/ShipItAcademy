import { createClient } from '@/lib/supabase/server';
import { getCourseWithModulesAndLessons } from './courses';
import { LessonProgress, Lesson } from '@/types/database';

export async function getTotalPublishedLessonCount(courseId: string): Promise<number> {
  const { modules } = await getCourseWithModulesAndLessons(courseId);
  return modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.status === 'published').length,
    0
  );
}

export async function getCompletedLessonCount(userId: string, courseId: string): Promise<number> {
  const { modules } = await getCourseWithModulesAndLessons(courseId);
  const lessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));

  if (lessonIds.length === 0) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from('lesson_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('completed', true)
    .in('lesson_id', lessonIds);

  if (error || count === null) return 0;
  return count;
}

export async function getCourseProgress(userId: string, courseId: string): Promise<number> {
  const total = await getTotalPublishedLessonCount(courseId);
  if (total === 0) return 0;
  const completed = await getCompletedLessonCount(userId, courseId);
  return Math.round((completed / total) * 100);
}

export async function getRecentCompletedLessons(
  userId: string,
  courseId: string
): Promise<(LessonProgress & { lesson: Lesson })[]> {
  const { modules } = await getCourseWithModulesAndLessons(courseId);
  const allLessonsMap = new Map<string, Lesson>();
  modules.forEach((m) => m.lessons.forEach((l) => allLessonsMap.set(l.id, l)));
  const lessonIds = Array.from(allLessonsMap.keys());

  if (lessonIds.length === 0) return [];

  const supabase = await createClient();
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)
    .in('lesson_id', lessonIds)
    .order('completed_at', { ascending: false })
    .limit(5);

  if (!progress) return [];

  return progress
    .map((p) => ({
      ...p,
      lesson: allLessonsMap.get(p.lesson_id)!,
    }))
    .filter((p) => p.lesson !== undefined);
}
