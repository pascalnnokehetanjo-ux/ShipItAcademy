import React from 'react';
import { Card } from '@/components/ui/Card';
import { Compass, CheckCircle2, ChevronRight, AlertCircle, FolderPlus, Play } from 'lucide-react';

interface NextActionsProps {
  onboardingCompleted: boolean;
  hasProject: boolean;
  completedCount: number;
  nextLessonTitle?: string;
  nextLessonSlug?: string;
}

export const NextActions: React.FC<NextActionsProps> = ({
  onboardingCompleted,
  hasProject,
  completedCount,
  nextLessonTitle,
  nextLessonSlug,
}) => {
  const actions = [];

  if (!onboardingCompleted) {
    actions.push({
      title: 'Complete onboarding',
      desc: 'Set your learning goals and time commitment',
      href: '/onboarding',
      icon: Compass,
      urgent: true,
    });
  }

  if (!hasProject) {
    actions.push({
      title: 'Define your app project',
      desc: 'Outline your app name, features, and screens',
      href: '/project',
      icon: FolderPlus,
      urgent: false,
    });
  }

  if (completedCount === 0 && nextLessonSlug) {
    actions.push({
      title: 'Start Lesson 1',
      desc: 'Understand what an app really is',
      href: `/lessons/${nextLessonSlug}`,
      icon: Play,
      urgent: true,
    });
  } else if (nextLessonTitle && nextLessonSlug) {
    actions.push({
      title: `Continue: ${nextLessonTitle}`,
      desc: 'Pick up where you left off',
      href: `/lessons/${nextLessonSlug}`,
      icon: Play,
      urgent: false,
    });
  } else {
    actions.push({
      title: 'Review your Google Play checklist',
      desc: 'All lessons complete! Prepare for publication',
      href: '/roadmap',
      icon: CheckCircle2,
      urgent: false,
    });
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-amber-500" />
          <span>Recommended Next Actions</span>
        </h3>
      </div>

      <div className="space-y-2.5">
        {actions.slice(0, 3).map((action, i) => {
          const Icon = action.icon;
          return (
            <a
              key={i}
              href={action.href}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  action.urgent ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{action.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          );
        })}
      </div>
    </Card>
  );
};
