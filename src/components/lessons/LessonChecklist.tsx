'use client';

import React, { useState, useTransition } from 'react';
import { saveLessonChecklistAction } from '@/app/(protected)/lessons/[lessonSlug]/actions';
import { Card } from '@/components/ui/Card';
import { CheckSquare, Square, Loader2, AlertCircle } from 'lucide-react';

interface LessonChecklistProps {
  lessonId: string;
  checklist: string[];
  initialState: Record<string, boolean>;
}

export const LessonChecklist: React.FC<LessonChecklistProps> = ({
  lessonId,
  checklist,
  initialState,
}) => {
  const [state, setState] = useState<Record<string, boolean>>(initialState || {});
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!checklist || checklist.length === 0) return null;

  const handleToggle = (index: number) => {
    const newState = {
      ...state,
      [index]: !state[index],
    };
    setState(newState);
    setErrorMessage(null);

    startTransition(async () => {
      const res = await saveLessonChecklistAction(lessonId, newState);
      if (res?.error) {
        setErrorMessage(res.error);
        // revert on failure
        setState(state);
      }
    });
  };

  return (
    <Card className="space-y-4 bg-blue-50/30 dark:bg-gray-900 border-blue-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Action Items & Checklist</span>
        </h3>
        {isPending && (
          <span className="text-xs text-gray-500 flex items-center space-x-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Saving...</span>
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2.5">
        {checklist.map((item, idx) => {
          const isChecked = !!state[idx];
          return (
            <div
              key={idx}
              onClick={() => handleToggle(idx)}
              className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                isChecked
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-gray-700 dark:text-gray-300'
                  : 'bg-white dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 focus:outline-none"
                aria-label={`Mark task "${item}" as ${isChecked ? 'incomplete' : 'complete'}`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              <span className={`text-sm select-none ${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
