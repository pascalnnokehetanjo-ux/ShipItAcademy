'use client';

import React, { useActionState } from 'react';
import { signUpAction } from '@/app/(public)/signup/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Smartphone, Mail, Key, User, CheckCircle2, AlertCircle } from 'lucide-react';

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <div className="w-full max-w-[420px] mx-auto py-12 px-4">
      <Card className="space-y-6 shadow-xl border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your free account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start your step-by-step journey to publishing on Google Play.
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
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Password (min 8 characters)
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
              Confirm password
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

          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="acceptTerms" className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer">
              I agree to the <span className="text-blue-600 dark:text-blue-400 font-medium">Terms</span> and <span className="text-blue-600 dark:text-blue-400 font-medium">Privacy Policy</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={isPending}
            className="w-full py-3"
          >
            {isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="text-center text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Log in
          </a>
        </div>
      </Card>
    </div>
  );
}
