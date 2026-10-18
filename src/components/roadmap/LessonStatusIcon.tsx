import React from 'react';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';

interface LessonStatusIconProps {
  isCompleted: boolean;
  isNextLesson: boolean;
}

export const LessonStatusIcon: React.FC<LessonStatusIconProps> = ({ isCompleted, isNextLesson }) => {
  if (isCompleted) {
    return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
  }

  if (isNextLesson) {
    return <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 animate-pulse" />;
  }

  return <Circle className="w-5 h-5 text-gray-300 dark:text-gray-700 shrink-0" />;
};
