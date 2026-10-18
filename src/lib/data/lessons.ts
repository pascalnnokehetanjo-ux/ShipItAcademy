import { createClient } from '@/lib/supabase/server';
import { Lesson, Module, Course, LessonProgress } from '@/types/database';

export interface LessonPageData {
  lesson: Lesson;
  module: Module;
  course: Course;
  progress: LessonProgress | null;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export async function getLessonBySlug(userId: string, lessonSlug: string): Promise<LessonPageData | null> {
  const supabase = await createClient();

  // 1. Fetch lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('slug', lessonSlug)
    .eq('status', 'published')
    .single();

  if (!lesson) return null;

  // 2. Fetch parent module
  const { data: module } = await supabase
    .from('modules')
    .select('*')
    .eq('id', lesson.module_id)
    .single();

  if (!module) return null;

  // 3. Fetch parent course
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', module.course_id)
    .eq('status', 'published')
    .single();

  if (!course) return null;

  // 4. Fetch user's progress for this lesson
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lesson.id)
    .single();

  // 5. Fetch all published lessons in the course in global order (modules order_index, then lessons order_index)
  const { data: allModules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  const allPublishedLessons: Lesson[] = [];
  if (allModules) {
    allModules.forEach((m: any) => {
      const sorted = (m.lessons || [])
        .filter((l: Lesson) => l.status === 'published')
        .sort((a: Lesson, b: Lesson) => a.order_index - b.order_index);
      allPublishedLessons.push(...sorted);
    });
  }

  const currentIndex = allPublishedLessons.findIndex((l) => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? allPublishedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allPublishedLessons.length - 1 ? allPublishedLessons[currentIndex + 1] : null;

  return {
    lesson,
    module,
    course,
    progress: progress || null,
    previousLesson,
    nextLesson,
  };
}

export async function getLessonChecklistState(userId: string, lessonId: string): Promise<Record<string, boolean>> {
  const supabase = await createClient();
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('checklist_state')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  return (progress?.checklist_state as Record<string, boolean>) || {};
}

export async function markLessonComplete(userId: string, lessonId: string) {
  const supabase = await createClient();

  // Verify lesson exists & is published
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, status, module_id')
    .eq('id', lessonId)
    .eq('status', 'published')
    .single();

  if (!lesson) throw new Error('Lesson not found or not published');

  // Verify course is published
  const { data: module } = await supabase
    .from('modules')
    .select('course_id')
    .eq('id', lesson.module_id)
    .single();

  if (!module) throw new Error('Module not found');

  const { data: course } = await supabase
    .from('courses')
    .select('id, status')
    .eq('id', module.course_id)
    .eq('status', 'published')
    .single();

  if (!course) throw new Error('Course not published');

  // Upsert progress
  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    );

  if (error) throw new Error(error.message);
  return true;
}

export async function markLessonIncomplete(userId: string, lessonId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: false,
        completed_at: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    );

  if (error) throw new Error(error.message);
  return true;
}

export async function saveChecklistState(
  userId: string,
  lessonId: string,
  checklistState: Record<string, boolean>
) {
  if (!checklistState || typeof checklistState !== 'object') {
    throw new Error('Invalid checklist state');
  }

  // Validate boolean values
  for (const val of Object.values(checklistState)) {
    if (typeof val !== 'boolean') {
      throw new Error('Checklist values must be boolean');
    }
  }

  const supabase = await createClient();

  // Fetch existing row to preserve completion status if any
  const { data: existing } = await supabase
    .from('lesson_progress')
    .select('completed, completed_at')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        checklist_state: checklistState,
        completed: existing?.completed || false,
        completed_at: existing?.completed_at || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    );

  if (error) throw new Error(error.message);
  return true;
}
