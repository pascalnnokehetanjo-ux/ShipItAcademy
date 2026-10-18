import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/data/profile';
import { getCurrentProject } from '@/lib/data/project';
import { redirect } from 'next/navigation';
import { CreateProjectForm } from '@/components/project/CreateProjectForm';
import { ProjectWorkspace } from '@/components/project/ProjectWorkspace';

export default async function ProjectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect('/login');
  }

  if (!profile.onboarding_completed) {
    redirect('/onboarding');
  }

  const project = await getCurrentProject(user.id);

  if (!project) {
    return <CreateProjectForm />;
  }

  return <ProjectWorkspace project={project} />;
}
