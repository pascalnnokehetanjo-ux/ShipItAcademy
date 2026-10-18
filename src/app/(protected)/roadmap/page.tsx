import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/data/profile';
import { getRoadmapData } from '@/lib/data/roadmap';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { RoadmapHeader } from '@/components/roadmap/RoadmapHeader';
import { ContinueLearningCard } from '@/components/roadmap/ContinueLearningCard';
import { CourseCompleteCard } from '@/components/roadmap/CourseCompleteCard';
import { ModuleCard } from '@/components/roadmap/ModuleCard';
import { AlertCircle } from 'lucide-react';

export default async function RoadmapPage() {
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

  const roadmapData = await getRoadmapData(user.id);

  if (!roadmapData) {
    return (
      <Container className="py-20">
        <Card className="text-center py-16 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold">Roadmap unavailable</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This course is not available yet. Please check back later.
          </p>
        </Card>
      </Container>
    );
  }

  const { course, modules, totalLessons, completedLessons, overallProgressPercentage, nextLesson } = roadmapData;

  // Find module title for next lesson
  let nextModuleTitle = '';
  if (nextLesson) {
    const mod = modules.find((m) => m.lessons.some((l) => l.id === nextLesson.id));
    if (mod) nextModuleTitle = mod.title;
  }

  // Calculate global lesson offset per module
  let globalLessonCount = 0;

  return (
    <Container className="py-10 space-y-10">
      <RoadmapHeader
        course={course}
        completedLessons={completedLessons}
        totalLessons={totalLessons}
        overallProgressPercentage={overallProgressPercentage}
      />

      {nextLesson ? (
        <ContinueLearningCard
          nextLesson={nextLesson}
          moduleTitle={nextModuleTitle}
          globalLessonNumber={globalLessonCount + 1}
        />
      ) : (
        <CourseCompleteCard show={completedLessons >= totalLessons} />
      )}

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Course Modules & Lessons
        </h2>

        {modules.length === 0 ? (
          <Card className="text-center py-12 text-gray-500">
            Course modules are being prepared.
          </Card>
        ) : (
          <div className="space-y-8">
            {modules.map((module, modIdx) => {
              const currentOffset = globalLessonCount;
              globalLessonCount += module.totalLessonCount;

              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  moduleIndex={modIdx + 1}
                  globalLessonOffset={currentOffset}
                />
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
