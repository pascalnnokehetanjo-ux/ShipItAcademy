import React from 'react';
import { RoadmapModule } from '@/lib/data/roadmap';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LessonListItem } from './LessonListItem';

interface ModuleCardProps {
  module: RoadmapModule;
  moduleIndex: number;
  globalLessonOffset: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  moduleIndex,
  globalLessonOffset,
}) => {
  const { title, description, completedLessonCount, totalLessonCount, progressPercentage, lessons } = module;

  return (
    <Card className="space-y-6">
      <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Module {moduleIndex}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
              {title}
            </h3>
          </div>
          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
            {completedLessonCount} of {totalLessonCount} lessons completed
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        <div className="pt-2">
          <ProgressBar value={completedLessonCount} max={totalLessonCount} size="sm" />
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, idx) => (
          <LessonListItem
            key={lesson.id}
            lesson={lesson}
            globalIndex={globalLessonOffset + idx + 1}
          />
        ))}
      </div>
    </Card>
  );
};
