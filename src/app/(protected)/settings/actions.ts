'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ExperienceLevel, LearningGoal } from '@/types/database';

export async function updateProfileAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const fullName = formData.get('fullName') as string;
    const experienceLevel = formData.get('experienceLevel') as ExperienceLevel;
    const learningGoal = formData.get('learningGoal') as LearningGoal;
    const weeklyHours = formData.get('weeklyHours') as string;

    if (!fullName || fullName.trim() === '') {
      return { error: 'Full name is required.' };
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim(),
        experience_level: experienceLevel || null,
        learning_goal: learningGoal || null,
        weekly_hours: weeklyHours || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw new Error(error.message);

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return { successMessage: 'Profile updated successfully.' };
  } catch (err: any) {
    return { error: err.message || 'Failed to update profile.' };
  }
}

export async function updatePasswordAction(prevState: any, formData: FormData) {
  try {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: 'All password fields are required.' };
    }

    if (newPassword.length < 8) {
      return { error: 'New password must be at least 8 characters.' };
    }

    if (newPassword !== confirmPassword) {
      return { error: 'New passwords do not match.' };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { error: 'Unauthorized' };
    }

    // Verify current password by signing in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      return { error: 'Current password is incorrect.' };
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return { error: updateError.message };
    }

    return { successMessage: 'Password updated successfully.', resetForm: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update password.' };
  }
}
