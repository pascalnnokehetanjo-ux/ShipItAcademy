import { createClient } from '@/lib/supabase/server';
import { Profile, ExperienceLevel, LearningGoal } from '@/types/database';

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile || null;
}

export async function updateOnboarding(data: {
  experienceLevel: ExperienceLevel;
  learningGoal: LearningGoal;
  weeklyHours: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('profiles')
    .update({
      experience_level: data.experienceLevel,
      learning_goal: data.learningGoal,
      weekly_hours: data.weeklyHours,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) throw new Error(error.message);
  return true;
}
