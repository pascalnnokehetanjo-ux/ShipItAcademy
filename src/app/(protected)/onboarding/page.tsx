import { getCurrentProfile } from '@/lib/data/profile';
import { redirect } from 'next/navigation';
import { OnboardingForm } from '@/components/onboarding/OnboardingForm';

export default async function OnboardingPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect('/login');
  }

  if (profile.onboarding_completed) {
    redirect('/dashboard');
  }

  return <OnboardingForm />;
}
