'use server';

import { createClient } from '@/lib/supabase/server';
import {
  createProject,
  updateProject,
  addProjectFeature,
  toggleProjectFeature,
  deleteProjectFeature,
  addProjectScreen,
  deleteProjectScreen,
  updateReleaseChecklist,
} from '@/lib/data/project';
import { FeaturePriority } from '@/types/project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProjectAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const appName = formData.get('appName') as string;
    const oneLinePurpose = formData.get('oneLinePurpose') as string;
    const targetUser = formData.get('targetUser') as string;
    const problemSolved = formData.get('problemSolved') as string;
    const appCategory = formData.get('appCategory') as string;
    const needsLogin = formData.get('needsLogin') === 'true';

    await createProject(user.id, {
      appName,
      oneLinePurpose,
      targetUser,
      problemSolved,
      appCategory,
      needsLogin,
    });

    revalidatePath('/project');
    revalidatePath('/dashboard');
  } catch (err: any) {
    return { error: err.message || 'Could not create project.' };
  }

  redirect('/project');
}

export async function updateProjectAction(projectId: string, prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const appName = formData.get('appName') as string;
    const oneLinePurpose = formData.get('oneLinePurpose') as string;
    const targetUser = formData.get('targetUser') as string;
    const problemSolved = formData.get('problemSolved') as string;
    const appCategory = formData.get('appCategory') as string;
    const needsLogin = formData.get('needsLogin') === 'true';

    await updateProject(user.id, projectId, {
      appName,
      oneLinePurpose,
      targetUser,
      problemSolved,
      appCategory,
      needsLogin,
    });

    revalidatePath('/project');
    revalidatePath('/dashboard');
    return { successMessage: 'Project updated.' };
  } catch (err: any) {
    return { error: err.message || 'Could not update project.' };
  }
}

export async function addProjectFeatureAction(projectId: string, prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as FeaturePriority;

    await addProjectFeature(user.id, projectId, {
      title,
      description,
      priority,
    });

    revalidatePath('/project');
    revalidatePath('/dashboard');
    return { success: true, reset: true };
  } catch (err: any) {
    return { error: err.message || 'Could not add feature.' };
  }
}

export async function toggleProjectFeatureAction(featureId: string, completed: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    await toggleProjectFeature(user.id, featureId, completed);
    revalidatePath('/project');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Could not toggle feature.' };
  }
}

export async function deleteProjectFeatureAction(featureId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    await deleteProjectFeature(user.id, featureId);
    revalidatePath('/project');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Could not delete feature.' };
  }
}

export async function addProjectScreenAction(projectId: string, prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const purpose = formData.get('purpose') as string;
    const notes = formData.get('notes') as string;

    await addProjectScreen(user.id, projectId, {
      name,
      purpose,
      notes,
    });

    revalidatePath('/project');
    return { success: true, reset: true };
  } catch (err: any) {
    return { error: err.message || 'Could not add screen.' };
  }
}

export async function deleteProjectScreenAction(screenId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    await deleteProjectScreen(user.id, screenId);
    revalidatePath('/project');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Could not delete screen.' };
  }
}

export async function updateReleaseChecklistAction(projectId: string, checklist: Record<string, boolean>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    await updateReleaseChecklist(user.id, projectId, checklist);
    revalidatePath('/project');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Could not update release checklist.' };
  }
}
