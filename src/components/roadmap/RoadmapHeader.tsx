import React from 'react';
import { Course } from '@/types/database';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface RoadmapHeaderProps {
  course: Course;
  completedLessons: number;
  totalLessons: number;
  overallProgressPercentage: number;
}

export const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  course,
  completedLessons,
  totalLessons,
  overallProgressPercentage,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Official Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {course.title}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            {course.description}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm min-w-[220px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{overallProgressPercentage}%</span>
          </div>
          <ProgressBar value={completedLessons} max={totalLessons} size="md" />
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{completedLessons} of {totalLessons} lessons completed</span>
          </p>
        </div>
      </div>
    </div>
  );
};
