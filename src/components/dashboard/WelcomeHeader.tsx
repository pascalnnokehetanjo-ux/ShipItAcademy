import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface WelcomeHeaderProps {
  fullName: string;
  progressPercent: number;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ fullName, progressPercent }) => {
  const firstName = fullName.split(' ')[0] || 'Learner';

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-gray-900 dark:to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">ShipIt Academy Dashboard</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm text-blue-100 mt-1 max-w-xl">
            You are making great strides toward publishing your first Android app on Google Play. Keep up the momentum!
          </p>
        </div>
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-4 text-center sm:min-w-[160px]">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{progressPercent}%</span>
          <p className="text-xs text-blue-200 mt-0.5">Overall Progress</p>
        </div>
      </div>
      <div className="pt-2">
        <ProgressBar value={progressPercent} max={100} className="[&_div:first-child]:text-blue-200" />
      </div>
    </div>
  );
};
