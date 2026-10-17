import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/data/profile';
import { getPublishedCourseBySlug, getFirstIncompleteLesson } from '@/lib/data/courses';
import { getCourseProgress, getCompletedLessonCount, getTotalPublishedLessonCount, getRecentCompletedLessons } from '@/lib/data/progress';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { ProgressOverview } from '@/components/dashboard/ProgressOverview';
import { CurrentLessonCard } from '@/components/dashboard/CurrentLessonCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ProjectStatusCard } from '@/components/dashboard/ProjectStatusCard';
import { NextActions } from '@/components/dashboard/NextActions';
import { AlertCircle, LogOut } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    return (
      <Container className="py-20">
        <Card className="text-center py-16 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold">Profile error</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We could not load your profile. Please log in again.
          </p>
          <form action="/auth/signout" method="post">
            <Button variant="primary" size="sm" href="/login">Log in again</Button>
          </form>
        </Card>
      </Container>
    );
  }

  if (!profile.onboarding_completed) {
    redirect('/onboarding');
  }

  // Fetch course
  const course = await getPublishedCourseBySlug('build-publish-first-android-app');

  if (!course) {
    return (
      <Container className="py-20">
        <Card className="text-center py-16 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold">Course unavailable</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The course is not available yet. Please check back later.
          </p>
        </Card>
      </Container>
    );
  }

  // Fetch progress & details
  const [
    progressPercent,
    completedCount,
    totalCount,
    nextLesson,
    recentLessons,
  ] = await Promise.all([
    getCourseProgress(user.id, course.id),
    getCompletedLessonCount(user.id, course.id),
    getTotalPublishedLessonCount(course.id),
    getFirstIncompleteLesson(user.id, course.id),
    getRecentCompletedLessons(user.id, course.id),
  ]);

  // Fetch module for next lesson if available
  let nextModule = null;
  if (nextLesson) {
    const { data: mod } = await supabase
      .from('modules')
      .select('*')
      .eq('id', nextLesson.module_id)
      .single();
    nextModule = mod;
  }

  // Fetch project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .single();

  let featureCount = 0;
  if (project) {
    const { count } = await supabase
      .from('project_features')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', project.id);
    featureCount = count || 0;
  }

  return (
    <Container className="py-10 space-y-8">
      <WelcomeHeader fullName={profile.full_name} progressPercent={progressPercent} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CurrentLessonCard lesson={nextLesson} module={nextModule} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ProgressOverview completedCount={completedCount} totalCount={totalCount} progressPercent={progressPercent} />
            <ProjectStatusCard project={project} featureCount={featureCount} />
          </div>
        </div>

        <div className="space-y-8">
          <NextActions
            onboardingCompleted={profile.onboarding_completed}
            hasProject={!!project}
            completedCount={completedCount}
            nextLessonTitle={nextLesson?.title}
            nextLessonSlug={nextLesson?.slug}
          />
          <RecentActivity recentLessons={recentLessons} firstLessonSlug={nextLesson?.slug} />
        </div>
      </div>
    </Container>
  );
}
