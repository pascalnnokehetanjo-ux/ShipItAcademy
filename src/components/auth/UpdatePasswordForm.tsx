'use client';

import React, { useActionState, useEffect } from 'react';
import { updatePasswordAction } from '@/app/(protected)/update-password/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Key, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePasswordAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.shouldRedirect) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-[420px] mx-auto py-12 px-4">
      <Card className="space-y-6 shadow-xl border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Key className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Set new password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please enter your new secure password below.
          </p>
        </div>

        {state?.error && (
          <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        {state?.successMessage && (
          <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{state.successMessage}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              New password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={isPending || state?.shouldRedirect}
            className="w-full py-3"
          >
            {isPending ? 'Updating password...' : 'Update password'}
          </Button>
        </form>

        {state?.shouldRedirect && (
          <div className="text-center pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="w-full"
            >
              Continue to dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
