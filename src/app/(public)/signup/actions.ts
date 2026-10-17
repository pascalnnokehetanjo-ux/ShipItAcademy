'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUpAction(prevState: any, formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const acceptTerms = formData.get('acceptTerms') === 'on';

  if (!fullName || fullName.trim() === '') {
    return { error: 'Full name is required.' };
  }

  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address.' };
  }

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  if (!acceptTerms) {
    return { error: 'You must agree to the Terms and Privacy Policy.' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
      },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email already registered.' };
    }
    return { error: error.message };
  }

  // If email confirmation is required or session is null
  if (data?.user && !data.session) {
    return { successMessage: 'Account created. Check your email to confirm your account.' };
  }

  redirect('/onboarding');
}
