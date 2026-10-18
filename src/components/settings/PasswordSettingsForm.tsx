'use client';

import React, { useActionState, useRef } from 'react';
import { updatePasswordAction } from '@/app/(protected)/settings/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Key, CheckCircle2, AlertCircle } from 'lucide-react';

export function PasswordSettingsForm() {
  const [state, formAction, isPending] = useActionState(updatePasswordAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.resetForm && formRef.current) {
    formRef.current.reset();
  }

  return (
    <Card className="space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
          <Key className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security & Password</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Change your account password securely.</p>
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

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Current password
          </label>
          <input
            type="password"
            name="currentPassword"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            New password (min 8 characters)
          </label>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Confirm new password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="secondary" size="md" disabled={isPending}>
            {isPending ? 'Updating password...' : 'Update password'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
