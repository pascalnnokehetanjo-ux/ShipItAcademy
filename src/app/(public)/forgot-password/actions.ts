'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  const headerList = await headers();
  const origin = headerList.get('origin') || 'http://localhost:3000';

  const supabase = await createClient();

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });

  return {
    successMessage: 'If an account exists for that email, we’ve sent a reset link.',
  };
}
