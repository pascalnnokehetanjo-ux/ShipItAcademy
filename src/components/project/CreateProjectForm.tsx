'use client';

import React, { useActionState } from 'react';
import { createProjectAction } from '@/app/(protected)/project/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FolderGit2, Smartphone, AlertCircle } from 'lucide-react';

export function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(createProjectAction, null);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      <Card className="space-y-6 shadow-xl border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your Android app project
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Define your core app concept, features, and release plan.
          </p>
        </div>

        {state?.error && (
          <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
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
              placeholder="Example: NoteMate"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Example: NoteMate</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              One-line purpose
            </label>
            <input
              type="text"
              name="oneLinePurpose"
              required
              placeholder="Example: A simple offline note-taking app for students."
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Example: A simple offline note-taking app for students.</p>
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
                placeholder="Students who want to save notes"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">Example: Students who need quick study notes.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                App category
              </label>
              <input
                type="text"
                name="appCategory"
                required
                placeholder="Productivity"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">Example: Productivity</p>
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
              placeholder="Students lose paper notes and need a simple way to organize them."
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Example: Students lose paper notes and need quick organization.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Does your app need login?
            </label>
            <select
              name="needsLogin"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">No (Recommended for first offline app)</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isPending}
              className="w-full py-3"
            >
              {isPending ? 'Creating project...' : 'Create my project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
