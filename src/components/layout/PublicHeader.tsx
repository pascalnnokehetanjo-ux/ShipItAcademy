import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Smartphone, Globe, Moon, Sun } from 'lucide-react';
import { Language } from '@/types';

interface PublicHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (path: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
}) => {
  const translations = {
    en: { login: 'Log in', startFree: 'Start free', curriculum: 'Curriculum' },
    fr: { login: 'Connexion', startFree: 'Commencer gratuit', curriculum: 'Programme' },
    ha: { login: 'Shiga', startFree: 'Fara kyauta', curriculum: 'Tsarin Karatu' },
  };

  const t = translations[currentLang] || translations.en;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <Container className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            ShipIt<span className="text-emerald-500">Academy</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <button onClick={() => onNavigate('/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('/roadmap')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t.curriculum}
          </button>
          <button onClick={() => onNavigate('/dashboard')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Dashboard
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ha">Hausa</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('/login')}
          >
            {t.login}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/signup')}
          >
            {t.startFree}
          </Button>
        </div>
      </Container>
    </header>
  );
};
