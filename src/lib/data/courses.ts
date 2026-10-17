import { createClient } from '@/lib/supabase/server';
import { Course, Module, Lesson } from '@/types/database';

export async function getPublishedCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  return course || null;
}

export async function getCourseWithModulesAndLessons(courseId: string): Promise<{ modules: (Module & { lessons: Lesson[] })[] }> {
  const supabase = await createClient();

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });

  if (!modules) return { modules: [] };

  // Sort lessons within each module
  const formattedModules = modules.map((m: any) => ({
    ...m,
    lessons: (m.lessons || []).sort((a: Lesson, b: Lesson) => a.order_index - b.order_index),
  })).sort((a: any, b: any) => a.order_index - b.order_index);

  return { modules: formattedModules };
}

export async function getFirstIncompleteLesson(userId: string, courseId: string): Promise<Lesson | null> {
  const { modules } = await getCourseWithModulesAndLessons(courseId);
  const allLessons: Lesson[] = modules.flatMap((m) => m.lessons.filter((l) => l.status === 'published'));

  if (allLessons.length === 0) return null;

  const supabase = await createClient();
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', userId);

  const completedLessonIds = new Set(
    (progress || []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  const firstIncomplete = allLessons.find((l) => !completedLessonIds.has(l.id));
  return firstIncomplete || allLessons[0];
}
