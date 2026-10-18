'use server';

import { createClient } from '@/lib/supabase/server';
import { saveChecklistState, markLessonComplete, markLessonIncomplete } from '@/lib/data/lessons';
import { revalidatePath } from 'next/cache';

export async function saveLessonChecklistAction(lessonId: string, checklistState: Record<string, boolean>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    await saveChecklistState(user.id, lessonId, checklistState);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save checklist' };
  }
}

export async function toggleLessonCompletionAction(lessonId: string, complete: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    if (complete) {
      await markLessonComplete(user.id, lessonId);
    } else {
      await markLessonIncomplete(user.id, lessonId);
    }

    revalidatePath('/dashboard');
    revalidatePath('/roadmap');
    revalidatePath('/lessons');

    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update lesson progress' };
  }
}
