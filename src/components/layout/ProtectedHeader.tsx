import React from 'react';
import { Container } from '@/components/ui/Container';
import { Smartphone, LayoutDashboard, Map, Compass, FolderGit2, Settings as SettingsIcon } from 'lucide-react';
import { Language } from '@/types';

interface ProtectedHeaderProps {
  currentPath: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (path: string) => void;
}

export const ProtectedHeader: React.FC<ProtectedHeaderProps> = ({
  currentPath,
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
}) => {
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
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            ShipIt<span className="text-emerald-500">Academy</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Exit to Home
          </button>
        </div>
      </Container>
    </header>
  );
};
