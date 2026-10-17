'use server';

import { createClient } from '@/lib/supabase/server';
import { updateOnboarding } from '@/lib/data/profile';
import { redirect } from 'next/navigation';
import { ExperienceLevel, LearningGoal } from '@/types/database';

export async function submitOnboardingAction(prevState: any, formData: FormData) {
  const experienceLevel = formData.get('experienceLevel') as ExperienceLevel;
  const learningGoal = formData.get('learningGoal') as LearningGoal;
  const weeklyHours = formData.get('weeklyHours') as string;

  if (!experienceLevel || !['beginner', 'some_coding', 'developer_new_to_android'].includes(experienceLevel)) {
    return { error: 'Please select a valid experience level.' };
  }

  if (!learningGoal || !['build_first_app', 'publish_google_play', 'learn_android', 'portfolio_project'].includes(learningGoal)) {
    return { error: 'Please select a valid learning goal.' };
  }

  if (!weeklyHours || !['less_than_3', '3_to_5', '5_to_10', 'more_than_10'].includes(weeklyHours)) {
    return { error: 'Please select a valid time commitment.' };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    await updateOnboarding({
      experienceLevel,
      learningGoal,
      weeklyHours,
    });
  } catch (err: any) {
    return { error: err.message || 'Failed to save onboarding data.' };
  }

  redirect('/dashboard');
}
