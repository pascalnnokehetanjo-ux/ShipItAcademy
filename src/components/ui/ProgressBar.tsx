import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label, className }) => {
  const safeMax = max > 0 ? max : 1;
  const percentage = Math.min(Math.max(Math.round((value / safeMax) * 100), 0), 100);

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden"
      >
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
