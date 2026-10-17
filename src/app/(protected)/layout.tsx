import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProtectedHeader } from '@/components/layout/ProtectedHeader';
import React from 'react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const fullName = profile?.full_name || user.email?.split('@')[0] || 'Learner';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      <ProtectedHeader fullName={fullName} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
