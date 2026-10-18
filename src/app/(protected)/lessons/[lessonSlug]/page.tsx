import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/data/profile';
import { getLessonBySlug } from '@/lib/data/lessons';
import { getRoadmapData } from '@/lib/data/roadmap';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LessonHeader } from '@/components/lessons/LessonHeader';
import { LessonContent } from '@/components/lessons/LessonContent';
import { CodeBlock } from '@/components/lessons/CodeBlock';
import { LessonChecklist } from '@/components/lessons/LessonChecklist';
import { LessonCompletion } from '@/components/lessons/LessonCompletion';
import { LessonNavigation } from '@/components/lessons/LessonNavigation';
import { LessonResources } from '@/components/lessons/LessonResources';
import { ChevronRight, Map, AlertCircle } from 'lucide-react';

interface LessonPageProps {
  params: Promise<{ lessonSlug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonSlug } = await params;

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

  const lessonData = await getLessonBySlug(user.id, lessonSlug);

  if (!lessonData) {
    return (
      <Container className="py-20">
        <Card className="text-center py-16 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-bold">Lesson not found</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This lesson is not available or has not been published yet.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="sm" href="/roadmap">
              <Map className="w-4 h-4 mr-2" /> Back to roadmap
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  const { lesson, module, course, progress, previousLesson, nextLesson } = lessonData;

  // Calculate global lesson number
  const roadmapData = await getRoadmapData(user.id);
  let globalLessonNumber = 1;
  if (roadmapData) {
    for (const mod of roadmapData.modules) {
      const idx = mod.lessons.findIndex((l) => l.id === lesson.id);
      if (idx !== -1) {
        // find accumulated count
        let count = 0;
        for (const m of roadmapData.modules) {
          if (m.id === mod.id) {
            count += idx + 1;
            break;
          }
          count += m.totalLessonCount;
        }
        globalLessonNumber = count;
        break;
      }
    }
  }

  const isCompleted = !!progress?.completed;
  const checklistState = (progress?.checklist_state as Record<string, boolean>) || {};

  return (
    <Container className="py-10 max-w-4xl space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <a href="/roadmap" className="hover:text-blue-600 dark:hover:text-blue-400">Roadmap</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <a href="/roadmap" className="hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-[160px] sm:max-w-xs">{module.title}</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-white truncate max-w-[180px] sm:max-w-sm">{lesson.title}</span>
      </nav>

      <div className="space-y-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-sm">
        <LessonHeader
          lesson={lesson}
          module={module}
          globalLessonNumber={globalLessonNumber}
          isCompleted={isCompleted}
        />

        <LessonContent content={lesson.content_md} />

        {lesson.code_snippet && (
          <CodeBlock code={lesson.code_snippet} language="kotlin" />
        )}

        <LessonChecklist
          lessonId={lesson.id}
          checklist={lesson.checklist}
          initialState={checklistState}
        />

        <LessonResources resources={lesson.resources} />

        <LessonCompletion
          lessonId={lesson.id}
          isCompleted={isCompleted}
        />

        <LessonNavigation
          previousLesson={previousLesson}
          nextLesson={nextLesson}
        />
      </div>
    </Container>
  );
}
