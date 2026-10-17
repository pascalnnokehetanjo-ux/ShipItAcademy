import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CheckCircle2, BookOpen } from 'lucide-react';

interface ProgressOverviewProps {
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  completedCount,
  totalCount,
  progressPercent,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Course Progress</span>
        </h3>
        <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold">
          {completedCount} / {totalCount} completed
        </span>
      </div>

      <ProgressBar value={completedCount} max={totalCount} label="Curriculum completion" />

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{completedCount} Lessons</p>
            <p className="text-gray-500">Finished</p>
          </div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{totalCount - completedCount} Lessons</div>
          <p className="text-gray-500">Remaining</p>
        </div>
      </div>
    </Card>
  );
};
