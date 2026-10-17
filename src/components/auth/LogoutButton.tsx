'use client';

import React, { useState } from 'react';
import { logoutUser } from '@/lib/actions/auth';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
    >
      <LogOut className="w-4 h-4" />
      <span>{isLoading ? 'Logging out...' : 'Log out'}</span>
    </Button>
  );
}
