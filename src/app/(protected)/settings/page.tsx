import { createClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/data/profile';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ProfileSettingsForm } from '@/components/settings/ProfileSettingsForm';
import { PasswordSettingsForm } from '@/components/settings/PasswordSettingsForm';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Settings, LogOut } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    return (
      <Container className="py-20">
        <Card className="text-center py-16 space-y-4 max-w-md mx-auto">
          <Settings className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="text-xl font-bold">Profile not found</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We could not load your profile. Please log in again.
          </p>
          <div className="pt-2">
            <LogoutButton />
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-10 max-w-3xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your profile details, learning goals, and security preferences.
        </p>
      </div>

      <div className="space-y-8">
        <ProfileSettingsForm profile={profile} userEmail={user.email || ''} />
        <PasswordSettingsForm />

        <Card className="flex items-center justify-between bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Sign out of your account</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">End your current session securely.</p>
          </div>
          <LogoutButton />
        </Card>
      </div>
    </Container>
  );
}
