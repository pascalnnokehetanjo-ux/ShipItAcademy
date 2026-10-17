import React, { useState, useEffect } from 'react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { ProtectedHeader } from '@/components/layout/ProtectedHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Language } from '@/types';
import { 
  Smartphone, Code, CheckCircle2, Rocket, Users, Award, BookOpen, 
  ArrowRight, ShieldCheck, Zap, HelpCircle, Check, Terminal, Play, Lock, Mail, Key
} from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync path with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const isProtected = [
    '/dashboard',
    '/roadmap',
    '/onboarding',
    '/project',
    '/settings'
  ].includes(currentPath) || currentPath.startsWith('/lessons/');

  // Translations object for multilingual interface (English, French, Hausa)
  const translations = {
    en: {
      heroTitle: 'Build and publish your first Android app.',
      heroSub: 'A step-by-step path from installing your tools to launching on Google Play.',
      heroDesc: 'Stop guessing how to build mobile apps. Follow our proven, beginner-friendly curriculum crafted by expert Android engineers to take you from zero coding experience to publishing on the Google Play Store.',
      startFree: 'Start free',
      viewCurriculum: 'View curriculum',
      whatYouLearn: 'What you will learn',
      learnSubtitle: 'Master everything needed to engineer, test, and ship production-grade Android apps.',
      whoFor: 'Who this is for',
      whoSubtitle: 'Designed specifically for future mobile creators with zero prior experience.',
      howItWorks: 'How it works',
      howSubtitle: 'Your streamlined 4-step journey to becoming a published Android app creator.',
      finalCtaTitle: 'Start building your first app today.',
      finalCtaSub: 'Join thousands of ambitious beginners who transformed their app ideas into reality.',
      loginTitle: 'Welcome back to ShipIt Academy',
      signupTitle: 'Create your free account',
      forgotTitle: 'Reset your password',
      placeholderNotice: 'This page will be built in a later phase.',
    },
    fr: {
      heroTitle: 'Créez et publiez votre première application Android.',
      heroSub: 'Un parcours étape par étape, de l’installation des outils au lancement sur Google Play.',
      heroDesc: 'Arrêtez de deviner comment créer des applications mobiles. Suivez notre programme éprouvé et adapté aux débutants pour passer de zéro à la publication.',
      startFree: 'Commencer gratuit',
      viewCurriculum: 'Voir le programme',
      whatYouLearn: 'Ce que vous allez apprendre',
      learnSubtitle: 'Maîtrisez tout ce dont vous avez besoin pour concevoir, tester et publier des applications Android.',
      whoFor: 'À qui s’adresse cette académie',
      whoSubtitle: 'Conçu spécifiquement pour les futurs créateurs sans expérience préalable.',
      howItWorks: 'Comment ça marche',
      howSubtitle: 'Votre parcours simplifié en 4 étapes pour devenir créateur d’applications Android.',
      finalCtaTitle: 'Commencez à créer votre première application dès aujourd’hui.',
      finalCtaSub: 'Rejoignez des milliers de débutants ambitieux.',
      loginTitle: 'Bon retour sur ShipIt Academy',
      signupTitle: 'Créez votre compte gratuit',
      forgotTitle: 'Réinitialisez votre mot de passe',
      placeholderNotice: 'Cette page sera construite dans une phase ultérieure.',
    },
    ha: {
      heroTitle: 'Gina kuma buga aikace-aikacen Android naka na farko.',
      heroSub: 'Hanya ta mataki-mataki daga shigar da kayan aiki zuwa ƙaddamarwa akan Google Play.',
      heroDesc: 'Daina zato yadda ake gina manhajojin waya. Bi tsarin karatunmu da aka gwada don kai ku daga matakin sifili zuwa wallafawa.',
      startFree: 'Fara kyauta',
      viewCurriculum: 'Duba Tsarin Karatu',
      whatYouLearn: 'Abin da zaku koya',
      learnSubtitle: 'Koyi komai da ake buƙata don tsarawa, gwadawa, da fitar da manhajojin Android.',
      whoFor: 'Wane ne wannan saboda shi?',
      whoSubtitle: 'An tsara shi musamman ga sabbin masu shaawa ba tare da masaniya ta baya ba.',
      howItWorks: 'Yadda yake aiki',
      howSubtitle: 'KAFIN tafiyarku ta mataki 4 don zama mai buga manhajar Android.',
      finalCtaTitle: 'Fara gina manhajarka ta farko a yau.',
      finalCtaSub: 'Kasance tare da dubban ɗalibai masu kishi waɗanda suka canza raoyinsu zuwa gaskiya.',
      loginTitle: 'Barka da dawowa ShipIt Academy',
      signupTitle: 'Ƙirƙiri kyautar asusunka',
      forgotTitle: 'Sake saita kalmar sirrinka',
      placeholderNotice: 'Wannan shafin za a gina shi a wani lokaci na gaba.',
    },
  };

  const t = translations[currentLang] || translations.en;

  // Render content based on current path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <div>
            {/* Hero Section (2 Columns, Hero requirements met) */}
            <section className="py-20 md:py-28 overflow-hidden bg-gradient-to-b from-blue-50/50 dark:from-gray-900 to-transparent">
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                      <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Android App Publishing Made Simple</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                      {t.heroTitle}
                    </h1>
                    <p className="text-lg sm:text-xl font-medium text-emerald-600 dark:text-emerald-400">
                      {t.heroSub}
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t.heroDesc}
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                      <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
                        {t.startFree} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => navigate('/roadmap')}>
                        {t.viewCurriculum}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-6 pt-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>No coding experience needed</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Google Play verified path</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Product Demo / Graphic Card */}
                  <div className="relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-xs font-mono text-gray-400">MainActivity.kt</span>
                      </div>
                      <div className="py-6 font-mono text-xs text-gray-800 dark:text-gray-200 space-y-2">
                        <p className="text-blue-600 dark:text-blue-400">package com.shipit.academy.app</p>
                        <p className="text-gray-400">// Welcome to ShipIt Studio IDE simulation</p>
                        <p><span className="text-purple-600">class</span> <span className="text-amber-500">MainActivity</span> : ComponentActivity() &#123;</p>
                        <p className="pl-4"><span className="text-purple-600">override fun</span> onCreate(savedInstanceState: Bundle?) &#123;</p>
                        <p className="pl-8">super.onCreate(savedInstanceState)</p>
                        <p className="pl-8">setContent &#123;</p>
                        <p className="pl-12 text-emerald-500">ShipItTheme &#123; Greeting(&quot;Android Creator&quot;) &#125;</p>
                        <p className="pl-8">&#125;</p>
                        <p className="pl-4">&#125;</p>
                        <p>&#125;</p>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">✓</div>
                          <div>
                            <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">Build Successful</p>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">APK generated & ready for Google Play</p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => navigate('/project')}>
                          Test App
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* "What you will learn" Section (6 cards) */}
            <section className="py-20 bg-white dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
              <Container>
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t.whatYouLearn}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {t.learnSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: '1. Prepare your app idea', desc: 'Define your problem, validate user demand, and scope your minimum viable app.' },
                    { title: '2. Set up Android tools', desc: 'Install Android Studio, configure emulators, and set up your developer environment.' },
                    { title: '3. Build interface with Kotlin & Jetpack Compose', desc: 'Design modern, responsive layouts using Google’s recommended UI toolkit.' },
                    { title: '4. Add logic, storage, and app state', desc: 'Handle user input, connect local databases, and manage reactive app state.' },
                    { title: '5. Test and improve your app', desc: 'Run diagnostics, debug errors, and optimize performance across device screen sizes.' },
                    { title: '6. Deploy and publish to Google Play', desc: 'Prepare store assets, sign your release bundle, and submit to the Google Play Console.' },
                  ].map((item, i) => (
                    <Card key={i} className="space-y-4 hover:border-blue-500/50 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </Container>
            </section>

            {/* "Who this is for" Section (3 cards) */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
              <Container>
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t.whoFor}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {t.whoSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete beginners</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No prior programming knowledge required. We start from absolute zero.</p>
                  </Card>
                  <Card className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Students building a portfolio</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Stand out to recruiters with a live, published app on the Google Play Store.</p>
                  </Card>
                  <Card className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                      <Code className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Developers new to Android</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transition quickly from web or other platforms into modern Android development.</p>
                  </Card>
                </div>
              </Container>
            </section>

            {/* "How it works" Section (4 steps) */}
            <section className="py-20 bg-white dark:bg-gray-900/50">
              <Container>
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t.howItWorks}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {t.howSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { step: '01', title: 'Choose small app idea', desc: 'Pick a focused, high-impact project you can build in weeks.' },
                    { step: '02', title: 'Follow guided lessons', desc: 'Step-by-step interactive lessons with code snippets & explanations.' },
                    { step: '03', title: 'Build a real Android app', desc: 'Write Kotlin code and assemble UI elements in your project workspace.' },
                    { step: '04', title: 'Prepare & publish', desc: 'Package your release and publish live to the Google Play Store.' },
                  ].map((s, i) => (
                    <div key={i} className="relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
                      <span className="text-3xl font-extrabold text-blue-600/30 dark:text-blue-400/30">{s.step}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-blue-600 dark:bg-blue-900 text-white">
              <Container className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {t.finalCtaTitle}
                </h2>
                <p className="text-lg text-blue-100 max-w-xl mx-auto">
                  {t.finalCtaSub}
                </p>
                <div className="pt-4">
                  <Button variant="secondary" size="lg" onClick={() => navigate('/signup')}>
                    {t.startFree} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Container>
            </section>
          </div>
        );

      case '/login':
        return (
          <div className="py-20">
            <Container size="sm">
              <Card className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.loginTitle}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enter your credentials to access your workspace.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input type="email" required placeholder="you@example.com" className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                      <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input type="password" required placeholder="••••••••" className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <Button variant="primary" size="md" className="w-full">Sign In</Button>
                </form>
                <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                  Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign up</button>
                </div>
              </Card>
            </Container>
          </div>
        );

      case '/signup':
        return (
          <div className="py-20">
            <Container size="sm">
              <Card className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.signupTitle}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Start your journey to building Android apps.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); navigate('/onboarding'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full name</label>
                    <input type="text" required placeholder="John Doe" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <input type="email" required placeholder="you@example.com" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input type="password" required placeholder="••••••••" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <Button variant="secondary" size="md" className="w-full">Create Account</Button>
                </form>
                <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                  Already have an account? <button onClick={() => navigate('/login')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Log in</button>
                </div>
              </Card>
            </Container>
          </div>
        );

      case '/forgot-password':
        return (
          <div className="py-20">
            <Container size="sm">
              <Card className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Key className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.forgotTitle}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enter your email to receive recovery instructions.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); alert('Password reset instructions sent!'); navigate('/login'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <input type="email" required placeholder="you@example.com" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <Button variant="primary" size="md" className="w-full">Send Reset Instructions</Button>
                </form>
                <div className="text-center text-xs">
                  <button onClick={() => navigate('/login')} className="text-blue-600 dark:text-blue-400 hover:underline">Back to log in</button>
                </div>
              </Card>
            </Container>
          </div>
        );

      // Protected placeholder pages matching Step 2 & 9 requirements
      case '/dashboard':
      case '/roadmap':
      case '/onboarding':
      case '/project':
      case '/settings':
      case currentPath.startsWith('/lessons/') ? currentPath : '':
        return (
          <div className="py-20">
            <Container size="md">
              <Card className="text-center py-16 space-y-6 border-dashed border-2">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Phase 1 Foundation Route: {currentPath}</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Workspace Preview</h2>
                  <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    “This page will be built in a later phase.”
                  </p>
                </div>
                <div className="pt-4 flex justify-center space-x-4">
                  <Button variant="primary" size="sm" onClick={() => navigate('/')}>
                    Return Home
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate('/roadmap')}>
                    View Roadmap
                  </Button>
                </div>
              </Card>
            </Container>
          </div>
        );

      default:
        return (
          <div className="py-20 text-center">
            <Container size="md">
              <Card className="space-y-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400">The requested page does not exist or has not been created yet.</p>
                <Button variant="primary" size="md" onClick={() => navigate('/')}>Go to Home</Button>
              </Card>
            </Container>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] ${isDarkMode ? 'dark' : ''}`}>
      {isProtected ? (
        <ProtectedHeader
          currentPath={currentPath}
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onNavigate={navigate}
        />
      ) : (
        <PublicHeader
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onNavigate={navigate}
        />
      )}

      <main className="flex-1">
        {renderPage()}
      </main>

      {!isProtected && (
        <PublicFooter currentLang={currentLang} onNavigate={navigate} />
      )}
    </div>
  );
}
