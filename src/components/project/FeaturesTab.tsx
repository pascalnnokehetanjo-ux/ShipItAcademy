'use client';

import React, { useActionState, useTransition } from 'react';
import { addProjectFeatureAction, toggleProjectFeatureAction, deleteProjectFeatureAction } from '@/app/(protected)/project/actions';
import { FullProject } from '@/lib/data/project';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeaturePriority } from '@/types/project';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface FeaturesTabProps {
  project: FullProject;
}

export const FeaturesTab: React.FC<FeaturesTabProps> = ({ project }) => {
  const addFeatureWithId = addProjectFeatureAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(addFeatureWithId, null);
  const [isMutating, startTransition] = useTransition();

  const handleToggle = (featureId: string, currentCompleted: boolean) => {
    startTransition(async () => {
      await toggleProjectFeatureAction(featureId, !currentCompleted);
    });
  };

  const handleDelete = (featureId: string) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      startTransition(async () => {
        await deleteProjectFeatureAction(featureId);
      });
    }
  };

  const mustHaveCount = project.project_features.filter((f) => f.priority === 'must_have').length;
  const completedCount = project.project_features.filter((f) => f.completed).length;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">App Features</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Define and prioritize the core features of your Android app.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold">
            Total: {project.project_features.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold">
            Done: {completedCount}
          </span>
        </div>
      </div>

      {/* Add Feature Form */}
      <Card className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Add New Feature</h4>
        {state?.error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}
        <form action={formAction} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            name="title"
            required
            placeholder="Feature title (e.g. Create note)"
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Short description"
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <select
              name="priority"
              defaultValue="must_have"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="must_have">Must have</option>
              <option value="should_have">Should have</option>
              <option value="later">Later</option>
            </select>
            <Button type="submit" variant="primary" size="sm" disabled={isPending}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Feature List */}
      <div className="space-y-3">
        {project.project_features.length === 0 ? (
          <Card className="text-center py-12 text-gray-500 dark:text-gray-400">
            No features yet. Add the 3–5 features your app must have.
          </Card>
        ) : (
          project.project_features.map((feature) => {
            const priorityColors = {
              must_have: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900',
              should_have: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
              later: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
            };

            return (
              <div
                key={feature.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  feature.completed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 opacity-80'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0 pr-4">
                  <button
                    onClick={() => handleToggle(feature.id, feature.completed)}
                    disabled={isMutating}
                    className="focus:outline-none shrink-0"
                    aria-label={`Mark feature "${feature.title}" as ${feature.completed ? 'incomplete' : 'complete'}`}
                  >
                    {feature.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-sm font-semibold truncate ${feature.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {feature.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${priorityColors[feature.priority]}`}>
                        {feature.priority.replace('_', ' ')}
                      </span>
                    </div>
                    {feature.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(feature.id)}
                  disabled={isMutating}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors focus:outline-none shrink-0"
                  aria-label={`Delete feature "${feature.title}"`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
