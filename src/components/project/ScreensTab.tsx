'use client';

import React, { useActionState, useTransition } from 'react';
import { addProjectScreenAction, deleteProjectScreenAction } from '@/app/(protected)/project/actions';
import { FullProject } from '@/lib/data/project';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2, Smartphone, AlertCircle } from 'lucide-react';

interface ScreensTabProps {
  project: FullProject;
}

export const ScreensTab: React.FC<ScreensTabProps> = ({ project }) => {
  const addScreenWithId = addProjectScreenAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(addScreenWithId, null);
  const [isMutating, startTransition] = useTransition();

  const handleDelete = (screenId: string) => {
    if (confirm('Are you sure you want to delete this screen?')) {
      startTransition(async () => {
        await deleteProjectScreenAction(screenId);
      });
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">App Screens & Layouts</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          Plan the main screens of your Android app and their purpose.
        </p>
      </div>

      {/* Add Screen Form */}
      <Card className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Add New Screen</h4>
        {state?.error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}
        <form action={formAction} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Screen name (e.g. Home)"
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose (e.g. View all notes)"
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              name="notes"
              placeholder="Design notes"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" variant="primary" size="sm" disabled={isPending}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Screen List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.project_screens.length === 0 ? (
          <div className="md:col-span-2">
            <Card className="text-center py-12 text-gray-500 dark:text-gray-400">
              No screens yet. Add the main screens of your app (e.g. Home, Details, Settings).
            </Card>
          </div>
        ) : (
          project.project_screens.map((screen) => (
            <Card key={screen.id} className="relative space-y-3 flex flex-col justify-between">
              <div className="space-y-1 pr-8">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{screen.name}</h4>
                </div>
                {screen.purpose && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    Purpose: {screen.purpose}
                  </p>
                )}
                {screen.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Notes: {screen.notes}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(screen.id)}
                disabled={isMutating}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
                aria-label={`Delete screen "${screen.name}"`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
