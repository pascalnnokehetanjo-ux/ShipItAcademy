import React from 'react';
import { Lesson, Module } from '@/types/database';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

interface LessonHeaderProps {
  lesson: Lesson;
  module: Module;
  globalLessonNumber: number;
  isCompleted: boolean;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  module,
  globalLessonNumber,
  isCompleted,
}) => {
  return (
    <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
          Lesson {globalLessonNumber} • {module.title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>~{lesson.estimated_minutes} minutes</span>
        </span>
        {isCompleted ? (
          <span className="text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        ) : (
          <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full flex items-center space-x-1">
            <Circle className="w-3.5 h-3.5" />
            <span>In progress</span>
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {lesson.title}
      </h1>

      {lesson.summary && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          {lesson.summary}
        </p>
      )}
    </div>
  );
};
