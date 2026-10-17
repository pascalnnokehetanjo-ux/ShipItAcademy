'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Smartphone, LayoutDashboard, Map, Compass, FolderGit2, Settings as SettingsIcon, Menu, X } from 'lucide-react';

interface ProtectedHeaderProps {
  fullName?: string;
}

export const ProtectedHeader: React.FC<ProtectedHeaderProps> = ({ fullName = 'Learner' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const firstName = fullName.split(' ')[0] || 'Learner';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'Onboarding', path: '/onboarding', icon: Compass },
    { name: 'My Project', path: '/project', icon: FolderGit2 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <Container className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => (window.location.href = '/')}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            ShipIt<span className="text-emerald-500">Academy</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Hi, <strong className="text-blue-600 dark:text-blue-400">{firstName}</strong>
          </span>
          <LogoutButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Signed in as <strong className="text-blue-600 dark:text-blue-400">{firstName}</strong>
            </span>
            <LogoutButton />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
