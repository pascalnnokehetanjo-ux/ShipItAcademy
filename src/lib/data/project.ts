import { createClient } from '@/lib/supabase/server';
import { Project, ProjectFeature, ProjectScreen } from '@/types/database';
import { CreateProjectInput, UpdateProjectInput, AddFeatureInput, AddScreenInput, ReleaseChecklistState } from '@/types/project';

export interface FullProject extends Project {
  project_features: ProjectFeature[];
  project_screens: ProjectScreen[];
}

export async function getCurrentProject(userId: string): Promise<FullProject | null> {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select(`
      *,
      project_features(*),
      project_screens(*)
    `)
    .eq('user_id', userId)
    .single();

  if (!project) return null;

  // Sort features and screens
  const features = (project.project_features || []).sort((a: ProjectFeature, b: ProjectFeature) => {
    if (a.order_index !== b.order_index) return a.order_index - b.order_index;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const screens = (project.project_screens || []).sort((a: ProjectScreen, b: ProjectScreen) => {
    if (a.order_index !== b.order_index) return a.order_index - b.order_index;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return {
    ...project,
    project_features: features,
    project_screens: screens,
  };
}

export async function createProject(userId: string, input: CreateProjectInput) {
  if (!input.appName?.trim()) throw new Error('App name is required');
  if (!input.oneLinePurpose?.trim()) throw new Error('One-line purpose is required');
  if (!input.targetUser?.trim()) throw new Error('Target user is required');
  if (!input.problemSolved?.trim()) throw new Error('Problem solved is required');
  if (!input.appCategory?.trim()) throw new Error('App category is required');

  const supabase = await createClient();

  const initialChecklist: ReleaseChecklistState = {
    app_icon_ready: false,
    screenshots_ready: false,
    privacy_policy_ready: false,
    data_safety_form_completed: false,
    signed_aab_created: false,
    internal_testing_completed: false,
    store_listing_completed: false,
    app_submitted_for_review: false,
  };

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      app_name: input.appName.trim(),
      one_line_purpose: input.oneLinePurpose.trim(),
      target_user: input.targetUser.trim(),
      problem_solved: input.problemSolved.trim(),
      app_category: input.appCategory.trim(),
      needs_login: !!input.needsLogin,
      status: 'idea_defined',
      release_checklist: initialChecklist,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('You already have a project.');
    }
    throw new Error(error.message);
  }

  return data;
}

export async function updateProject(userId: string, projectId: string, input: UpdateProjectInput) {
  if (!input.appName?.trim()) throw new Error('App name is required');
  if (!input.oneLinePurpose?.trim()) throw new Error('One-line purpose is required');
  if (!input.targetUser?.trim()) throw new Error('Target user is required');
  if (!input.problemSolved?.trim()) throw new Error('Problem solved is required');
  if (!input.appCategory?.trim()) throw new Error('App category is required');

  const supabase = await createClient();

  // Verify ownership
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single();

  if (!project) throw new Error('Project not found or unauthorized');

  const { error } = await supabase
    .from('projects')
    .update({
      app_name: input.appName.trim(),
      one_line_purpose: input.oneLinePurpose.trim(),
      target_user: input.targetUser.trim(),
      problem_solved: input.problemSolved.trim(),
      app_category: input.appCategory.trim(),
      needs_login: !!input.needsLogin,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId);

  if (error) throw new Error(error.message);
  return true;
}

export async function addProjectFeature(userId: string, projectId: string, input: AddFeatureInput) {
  if (!input.title?.trim()) throw new Error('Feature title is required');
  if (!['must_have', 'should_have', 'later'].includes(input.priority)) {
    throw new Error('Invalid feature priority');
  }

  const supabase = await createClient();

  // Verify project ownership
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single();

  if (!project) throw new Error('Project not found or unauthorized');

  // Get current max order_index
  const { data: existingFeatures } = await supabase
    .from('project_features')
    .select('order_index')
    .eq('project_id', projectId)
    .order('order_index', { ascending: false })
    .limit(1);

  const nextOrder = existingFeatures && existingFeatures.length > 0 ? existingFeatures[0].order_index + 1 : 1;

  const { error } = await supabase
    .from('project_features')
    .insert({
      project_id: projectId,
      title: input.title.trim(),
      description: input.description?.trim() || '',
      priority: input.priority,
      completed: false,
      order_index: nextOrder,
    });

  if (error) throw new Error(error.message);
  return true;
}

export async function toggleProjectFeature(userId: string, featureId: string, completed: boolean) {
  const supabase = await createClient();

  // Verify feature belongs to user's project via join
  const { data: feature } = await supabase
    .from('project_features')
    .select('id, project_id, projects!inner(user_id)')
    .eq('id', featureId)
    .single();

  if (!feature || (feature.projects as any).user_id !== userId) {
    throw new Error('Feature not found or unauthorized');
  }

  const { error } = await supabase
    .from('project_features')
    .update({ completed })
    .eq('id', featureId);

  if (error) throw new Error(error.message);
  return true;
}

export async function deleteProjectFeature(userId: string, featureId: string) {
  const supabase = await createClient();

  const { data: feature } = await supabase
    .from('project_features')
    .select('id, project_id, projects!inner(user_id)')
    .eq('id', featureId)
    .single();

  if (!feature || (feature.projects as any).user_id !== userId) {
    throw new Error('Feature not found or unauthorized');
  }

  const { error } = await supabase
    .from('project_features')
    .delete()
    .eq('id', featureId);

  if (error) throw new Error(error.message);
  return true;
}

export async function addProjectScreen(userId: string, projectId: string, input: AddScreenInput) {
  if (!input.name?.trim()) throw new Error('Screen name is required');

  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single();

  if (!project) throw new Error('Project not found or unauthorized');

  const { data: existingScreens } = await supabase
    .from('project_screens')
    .select('order_index')
    .eq('project_id', projectId)
    .order('order_index', { ascending: false })
    .limit(1);

  const nextOrder = existingScreens && existingScreens.length > 0 ? existingScreens[0].order_index + 1 : 1;

  const { error } = await supabase
    .from('project_screens')
    .insert({
      project_id: projectId,
      name: input.name.trim(),
      purpose: input.purpose?.trim() || '',
      notes: input.notes?.trim() || '',
      order_index: nextOrder,
    });

  if (error) throw new Error(error.message);
  return true;
}

export async function deleteProjectScreen(userId: string, screenId: string) {
  const supabase = await createClient();

  const { data: screen } = await supabase
    .from('project_screens')
    .select('id, project_id, projects!inner(user_id)')
    .eq('id', screenId)
    .single();

  if (!screen || (screen.projects as any).user_id !== userId) {
    throw new Error('Screen not found or unauthorized');
  }

  const { error } = await supabase
    .from('project_screens')
    .delete()
    .eq('id', screenId);

  if (error) throw new Error(error.message);
  return true;
}

export async function updateReleaseChecklist(
  userId: string,
  projectId: string,
  checklist: Record<string, boolean>
) {
  const allowedKeys = [
    'app_icon_ready',
    'screenshots_ready',
    'privacy_policy_ready',
    'data_safety_form_completed',
    'signed_aab_created',
    'internal_testing_completed',
    'store_listing_completed',
    'app_submitted_for_review',
  ];

  for (const key of Object.keys(checklist)) {
    if (!allowedKeys.includes(key)) {
      throw new Error(`Invalid checklist key: ${key}`);
    }
    if (typeof checklist[key] !== 'boolean') {
      throw new Error(`Invalid checklist value for ${key}`);
    }
  }

  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single();

  if (!project) throw new Error('Project not found or unauthorized');

  const { error } = await supabase
    .from('projects')
    .update({
      release_checklist: checklist,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId);

  if (error) throw new Error(error.message);
  return true;
}
