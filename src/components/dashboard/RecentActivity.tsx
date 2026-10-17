import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LessonProgress, Lesson } from '@/types/database';
import { CheckCircle2, History, ArrowRight } from 'lucide-react';

interface RecentActivityProps {
  recentLessons: (LessonProgress & { lesson: Lesson })[];
  firstLessonSlug?: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ recentLessons, firstLessonSlug }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-500" />
          <span>Recent Activity</span>
        </h3>
      </div>

      {recentLessons.length === 0 ? (
        <div className="text-center py-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You have not completed any lessons yet.
          </p>
          {firstLessonSlug && (
            <Button variant="secondary" size="sm" href={`/lessons/${firstLessonSlug}`}>
              Start Lesson 1 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {recentLessons.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[220px] sm:max-w-xs">
                  {item.lesson.title}
                </span>
              </div>
              <span className="text-[11px] text-gray-400">
                {item.completed_at ? new Date(item.completed_at).toLocaleDateString() : 'Completed'}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
