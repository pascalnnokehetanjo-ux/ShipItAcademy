'use client';

import React, { useState, useTransition } from 'react';
import { toggleLessonCompletionAction } from '@/app/(protected)/lessons/[lessonSlug]/actions';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw, Loader2, AlertCircle } from 'lucide-react';

interface LessonCompletionProps {
  lessonId: string;
  isCompleted: boolean;
}

export const LessonCompletion: React.FC<LessonCompletionProps> = ({ lessonId, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggleCompletion = () => {
    const nextState = !completed;
    setCompleted(nextState);
    setErrorMessage(null);

    startTransition(async () => {
      const res = await toggleLessonCompletionAction(lessonId, nextState);
      if (res?.error) {
        setErrorMessage(res.error);
        setCompleted(!nextState); // revert
      }
    });
  };

  return (
    <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-800">
      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-900 dark:to-gray-900 border border-blue-100 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {completed ? 'Lesson completed! 🎉' : 'Finished this lesson?'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {completed
              ? 'Great job! Your progress has been saved.'
              : 'Mark this lesson as complete to update your dashboard and roadmap.'}
          </p>
        </div>

        <div>
          {completed ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handleToggleCompletion}
              disabled={isPending}
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
              )}
              Completed (Mark as incomplete)
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleToggleCompletion}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              Mark lesson complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
