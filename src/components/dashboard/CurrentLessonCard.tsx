import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Lesson, Module } from '@/types/database';
import { PlayCircle, Clock, BookMarked } from 'lucide-react';

interface CurrentLessonCardProps {
  lesson: Lesson | null;
  module: Module | null;
}

export const CurrentLessonCard: React.FC<CurrentLessonCardProps> = ({ lesson, module }) => {
  if (!lesson) {
    return (
      <Card className="space-y-4 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-gray-900 dark:to-gray-900">
        <h3 className="font-semibold text-gray-900 dark:text-white">Current Lesson</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">You have completed all published lessons! Review your Google Play checklist.</p>
      </Card>
    );
  }

  return (
    <Card className="space-y-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-blue-950/30 border-blue-200 dark:border-blue-900/50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center space-x-1.5">
          <BookMarked className="w-3.5 h-3.5" />
          <span>{module?.title || 'Current Module'}</span>
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>~{lesson.estimated_minutes} mins</span>
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {lesson.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {lesson.summary || 'Continue your learning journey with this guided step.'}
        </p>
      </div>

      <div className="pt-2">
        <Button variant="primary" size="md" href={`/lessons/${lesson.slug}`} className="w-full sm:w-auto">
          <PlayCircle className="w-4 h-4 mr-2" /> Continue Lesson
        </Button>
      </div>
    </Card>
  );
};
