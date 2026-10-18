'use client';

import React, { useActionState } from 'react';
import { updateProjectAction } from '@/app/(protected)/project/actions';
import { FullProject } from '@/lib/data/project';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface AppIdeaTabProps {
  project: FullProject;
}

export const AppIdeaTab: React.FC<AppIdeaTabProps> = ({ project }) => {
  const updateWithId = updateProjectAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(updateWithId, null);

  return (
    <Card className="max-w-3xl space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">App Idea & Concept</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          Refine your core app definition at any time as your concept evolves.
        </p>
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
            App name
          </label>
          <input
            type="text"
            name="appName"
            required
            defaultValue={project.app_name}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            One-line purpose
          </label>
          <input
            type="text"
            name="oneLinePurpose"
            required
            defaultValue={project.one_line_purpose || ''}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Target user
            </label>
            <input
              type="text"
              name="targetUser"
              required
              defaultValue={project.target_user || ''}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              App category
            </label>
            <input
              type="text"
              name="appCategory"
              required
              defaultValue={project.app_category || ''}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Problem solved
          </label>
          <textarea
            name="problemSolved"
            required
            rows={3}
            defaultValue={project.problem_solved || ''}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Does your app need login?
          </label>
          <select
            name="needsLogin"
            defaultValue={project.needs_login ? 'true' : 'false'}
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="false">No (Recommended for first offline app)</option>
            <option value="true">Yes</option>
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
};
