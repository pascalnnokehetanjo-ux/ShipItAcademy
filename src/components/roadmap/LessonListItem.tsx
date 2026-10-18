import React from 'react';
import { RoadmapLesson } from '@/lib/data/roadmap';
import { LessonStatusIcon } from './LessonStatusIcon';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonListItemProps {
  lesson: RoadmapLesson;
  globalIndex: number;
}

export const LessonListItem: React.FC<LessonListItemProps> = ({ lesson, globalIndex }) => {
  const { title, slug, estimated_minutes, isCompleted, isNextLesson } = lesson;

  return (
    <a
      href={`/lessons/${slug}`}
      className={cn(
        'flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all group min-h-[44px]',
        isNextLesson
          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 shadow-sm ring-1 ring-blue-500/20'
          : isCompleted
          ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
      )}
      aria-current={isNextLesson ? 'page' : undefined}
    >
      <div className="flex items-center space-x-3.5 min-w-0 pr-3">
        <LessonStatusIcon isCompleted={isCompleted} isNextLesson={isNextLesson} />
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-gray-400">Lesson {globalIndex}</span>
            {isNextLesson && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">
                Continue here
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h4>
        </div>
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{estimated_minutes}m</span>
        </span>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline hidden sm:inline">
          {isCompleted ? 'Review' : isNextLesson ? 'Continue' : 'Start'}
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </a>
  );
};
