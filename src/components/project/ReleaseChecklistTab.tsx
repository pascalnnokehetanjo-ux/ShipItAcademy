'use client';

import React, { useState, useTransition } from 'react';
import { updateReleaseChecklistAction } from '@/app/(protected)/project/actions';
import { FullProject } from '@/lib/data/project';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CheckSquare, Square, Loader2, AlertCircle } from 'lucide-react';
import { ReleaseChecklistKey, ReleaseChecklistState } from '@/types/project';

interface ReleaseChecklistTabProps {
  project: FullProject;
}

export const ReleaseChecklistTab: React.FC<ReleaseChecklistTabProps> = ({ project }) => {
  const [checklist, setChecklist] = useState<ReleaseChecklistState>(
    (project.release_checklist as ReleaseChecklistState) || {
      app_icon_ready: false,
      screenshots_ready: false,
      privacy_policy_ready: false,
      data_safety_form_completed: false,
      signed_aab_created: false,
      internal_testing_completed: false,
      store_listing_completed: false,
      app_submitted_for_review: false,
    }
  );
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const items: { key: ReleaseChecklistKey; title: string; desc: string }[] = [
    { key: 'app_icon_ready', title: 'App icon ready', desc: 'Create a simple, recognizable icon for your app.' },
    { key: 'screenshots_ready', title: 'Screenshots ready', desc: 'Prepare clear screenshots showing the main screens.' },
    { key: 'privacy_policy_ready', title: 'Privacy policy ready', desc: 'Create a page explaining what data your app collects and how it is used.' },
    { key: 'data_safety_form_completed', title: 'Data Safety form completed', desc: 'Complete Google Play’s Data Safety form honestly.' },
    { key: 'signed_aab_created', title: 'Signed AAB created', desc: 'Generate a signed Android App Bundle for upload.' },
    { key: 'internal_testing_completed', title: 'Internal testing completed', desc: 'Test the app with real users before public release.' },
    { key: 'store_listing_completed', title: 'Store listing completed', desc: 'Add app title, description, screenshots, and category.' },
    { key: 'app_submitted_for_review', title: 'App submitted for review', desc: 'Submit the app to Google Play for review.' },
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const handleToggle = (key: ReleaseChecklistKey) => {
    const updated = {
      ...checklist,
      [key]: !checklist[key],
    };
    setChecklist(updated);
    setErrorMessage(null);

    startTransition(async () => {
      const res = await updateReleaseChecklistAction(project.id, updated);
      if (res?.error) {
        setErrorMessage(res.error);
        setChecklist(checklist); // revert
      }
    });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Google Play Release Checklist</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Track your progress from app concept to Google Play publication.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
          {completedCount} of 8 release tasks completed
        </div>
      </div>

      <ProgressBar value={completedCount} max={8} size="md" />

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => {
          const isChecked = !!checklist[item.key];
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                isChecked
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 focus:outline-none"
                aria-label={`Mark "${item.title}" as ${isChecked ? 'incomplete' : 'complete'}`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${isChecked ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-gray-900 dark:text-white'}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
