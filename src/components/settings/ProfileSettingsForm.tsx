'use client';

import React, { useActionState } from 'react';
import { updateProfileAction } from '@/app/(protected)/settings/actions';
import { Profile } from '@/types/database';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { User, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileSettingsFormProps {
  profile: Profile;
  userEmail: string;
}

export function ProfileSettingsForm({ profile, userEmail }: ProfileSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, null);

  return (
    <Card className="space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Settings</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Update your personal information and goals.</p>
        </div>
      </div>

      {state?.error && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.successMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{state.successMessage}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            required
            defaultValue={profile.full_name}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Email address (read-only)
          </label>
          <input
            type="email"
            disabled
            value={userEmail}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Experience level
          </label>
          <select
            name="experienceLevel"
            defaultValue={profile.experience_level || 'beginner'}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">Complete beginner</option>
            <option value="some_coding">Some coding experience</option>
            <option value="developer_new_to_android">Developer but new to Android</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Learning goal
          </label>
          <select
            name="learningGoal"
            defaultValue={profile.learning_goal || 'build_first_app'}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="build_first_app">Build my first app</option>
            <option value="publish_google_play">Publish an app to Google Play</option>
            <option value="learn_android">Learn Android development</option>
            <option value="portfolio_project">Create a portfolio project</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Weekly time commitment
          </label>
          <select
            name="weeklyHours"
            defaultValue={profile.weekly_hours || '3_to_5'}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="less_than_3">Less than 3 hours</option>
            <option value="3_to_5">3–5 hours</option>
            <option value="5_to_10">5–10 hours</option>
            <option value="more_than_10">More than 10 hours</option>
          </select>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="md" disabled={isPending}>
            {isPending ? 'Saving changes...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
