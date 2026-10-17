import React from 'react';
import { Container } from '@/components/ui/Container';
import { Smartphone } from 'lucide-react';
import { Language } from '@/types';

interface PublicFooterProps {
  currentLang: Language;
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ currentLang, onNavigate }) => {
  const translations = {
    en: {
      desc: 'The premier step-by-step academy for building and publishing Android apps on Google Play.',
      links: 'Quick Links',
      login: 'Log in',
      signup: 'Sign up',
      roadmap: 'Roadmap',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: '© 2026 ShipIt Academy. All rights reserved.',
    },
    fr: {
      desc: 'La première académie étape par étape pour créer et publier des applications Android sur Google Play.',
      links: 'Liens Rapides',
      login: 'Connexion',
      signup: 'Inscription',
      roadmap: 'Feuille de route',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
      rights: '© 2026 ShipIt Academy. Tous droits réservés.',
    },
    ha: {
      desc: 'Makarantar farko ta mataki-mataki don gina da buga aikace-aikacen Android akan Google Play.',
      links: 'Hanyoyi masu sauri',
      login: 'Shiga',
      signup: 'Yi rijista',
      roadmap: 'Tsarin ayyuka',
      privacy: 'Manufar Sirri',
      terms: 'Dokokin Sabis',
      rights: '© 2026 ShipIt Academy. An kiyaye dukkan hakkoki.',
    },
  };

  const t = translations[currentLang] || translations.en;

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
              ShipIt<span className="text-emerald-500">Academy</span>
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            {t.desc}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{t.links}</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <button onClick={() => onNavigate('/login')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.login}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/signup')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.signup}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/roadmap')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.roadmap}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert(t.privacy); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.privacy}
              </a>
            </li>
            <li>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert(t.terms); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.terms}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
        <Container className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>{t.rights}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span>Powered by Next.js & Android Studio</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};
