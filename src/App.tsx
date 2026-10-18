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
  ArrowRight, ShieldCheck, Zap, HelpCircle, Check, Terminal, Play, Lock, Mail, Key,
  Sparkles, CheckSquare, Square, User, Settings as SettingsIcon, FileText, ArrowLeft,
  ChevronRight, RefreshCw, LogOut, CheckCircle, HelpCircle as QuestionIcon
} from 'lucide-react';

// Full course seed data: 6 modules, 30 lessons total
const COURSES_DATA = [
  {
    id: 'course-1',
    title: 'Build and Publish Your First Android App',
    slug: 'build-publish-first-android-app',
    description: 'Learn how to build a real Android app using Kotlin and Jetpack Compose, then prepare and publish it to Google Play.',
    modules: [
      {
        id: 'm1',
        title: 'Prepare Your App Idea',
        description: 'Validate your concept, define target users, and plan your core feature set.',
        order_index: 1,
        lessons: [
          { id: 'l1', title: 'Understand what an app really is', slug: 'understand-what-an-app-really-is', summary: 'Learn the essential parts of every app: interface, logic, data, testing, deployment, and publication.', order_index: 1, duration: '10 min', content: '# Understand what an app really is\n\nAn app is more than a screen. When someone opens an app, several parts work together.\n\n## The main parts of an app\n\n### 1. User interface\nThe user interface (UI) is what the user sees and touches: buttons, text, forms, images, and screens.\n\n### 2. App logic\nApp logic decides what happens when the user taps something. For example, tapping **Save** validates the input and records data.\n\n### 3. Data\nData is the information your app stores locally or in the cloud.\n\n## Your first app: NoteMate\nIn this course, you will build **NoteMate**, a simple offline note-taking app.', code: 'class MainActivity : ComponentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContent { ShipItTheme { Surface { Greeting("Hello Android Creator") } } }\n    }\n}', checklist: ['Define app purpose', 'List core features', 'Understand UI vs logic'], resources: ['Android Developer Guide', 'Jetpack Compose Basics'] },
          { id: 'l2', title: 'Define target users and scope', slug: 'define-target-users-and-scope', summary: 'Identify who your app is for and keep your MVP simple enough to ship quickly.', order_index: 2, duration: '12 min', content: '# Define target users and scope\n\nScope creep is the #1 reason beginner apps never get finished. Keep your scope laser-focused on solving one problem exceptionally well.', code: '// Keep MVP scope minimal\nval maxCoreFeatures = 3\nval targetReleaseWeeks = 4', checklist: ['Write down user persona', 'Limit MVP to 3 core features', 'Set target launch date'], resources: ['MVP Scope Worksheet'] },
          { id: 'l3', title: 'Sketch your user flow', slug: 'sketch-your-user-flow', summary: 'Map out the exact screens and taps required for a user to complete their main goal.', order_index: 3, duration: '15 min', content: '# Sketch your user flow\n\nBefore writing Kotlin code, map how screens connect: Launch Screen -> Dashboard -> Editor -> Saved.', code: '/* User Flow Diagram\n  [Home] -> [Create New] -> [Edit Note] -> [Save] -> [List View]\n*/', checklist: ['Sketch 3 primary screens', 'Define navigation path', 'Identify error states'], resources: ['UI Wireframe Templates'] },
          { id: 'l4', title: 'Choose your tech stack', slug: 'choose-your-tech-stack', summary: 'Learn why Kotlin and Jetpack Compose are the industry standard for modern Android apps.', order_index: 4, duration: '10 min', content: '# Choose your tech stack\n\nWe use **Kotlin** (Google’s preferred programming language for Android) and **Jetpack Compose** (modern declarative UI toolkit).', code: '// Jetpack Compose Button\nButton(onClick = { /* save note */ }) {\n    Text("Save Note")\n}', checklist: ['Install Kotlin mindset', 'Review Compose advantages', 'Prepare workspace'], resources: ['Kotlin Lang Documentation'] },
          { id: 'l5', title: 'Plan your project milestones', slug: 'plan-your-project-milestones', summary: 'Break your app-building journey into weekly milestones so you never feel overwhelmed.', order_index: 5, duration: '10 min', content: '# Plan your project milestones\n\nMilestones keep momentum high. Week 1: Setup. Week 2: UI. Week 3: Logic. Week 4: Publish.', code: 'val milestones = listOf("Setup", "UI", "Logic", "Publishing")', checklist: ['Schedule weekly study hours', 'Set milestone checkpoints', 'Join community support'], resources: ['Milestone Planner PDF'] },
        ]
      },
      {
        id: 'm2',
        title: 'Set Up Your Development Environment',
        description: 'Install Android Studio, configure emulators, and master Git version control.',
        order_index: 2,
        lessons: [
          { id: 'l6', title: 'Install Android Studio and SDKs', slug: 'install-android-studio-and-sdks', summary: 'Download Android Studio Hedgehog/Iguana, configure SDK components, and verify installation.', order_index: 1, duration: '20 min', content: '# Install Android Studio\n\nAndroid Studio is your official IDE for building Android apps. It includes the compiler, layout previewer, and emulator manager.', code: '# Verify Android Home environment\necho $ANDROID_HOME', checklist: ['Download Android Studio', 'Install SDK Platform 34', 'Verify gradle build sync'], resources: ['Android Studio Official Downloads'] },
          { id: 'l7', title: 'Configure and test the Android Emulator', slug: 'configure-and-test-the-android-emulator', summary: 'Set up a Pixel virtual device in Device Manager and run your first Hello World app.', order_index: 2, duration: '15 min', content: '# Test the Android Emulator\n\nThe virtual device lets you test your app on different Android versions and screen sizes without needing a physical phone.', code: '// Run on emulator\nadb devices\nadb shell', checklist: ['Create Pixel 7 Virtual Device', 'Cold boot emulator', 'Run preview app'], resources: ['Emulator Troubleshooting Guide'] },
          { id: 'l8', title: 'Explore the Android Studio project structure', slug: 'explore-the-android-studio-project-structure', summary: 'Understand app/src/main, manifests, gradle scripts, and res folders.', order_index: 3, duration: '15 min', content: '# Project Structure\n\n- `manifests/`: App permissions and metadata\n- `java/`: Kotlin source code\n- `res/`: UI drawables, strings, and themes', code: '// build.gradle.kts\nplugins {\n    id("com.android.application")\n    id("org.jetbrains.kotlin.android")\n}', checklist: ['Explore manifest file', 'Inspect Gradle build file', 'Locate MainActivity.kt'], resources: ['Project Structure Cheat Sheet'] },
          { id: 'l9', title: 'Version control basics with Git', slug: 'version-control-basics-with-git', summary: 'Initialize a Git repository, make your first commit, and push your code to GitHub.', order_index: 4, duration: '15 min', content: '# Git Version Control\n\nProtect your code history by committing frequently as you build features.', code: 'git init\ngit add .\ngit commit -m "Initial commit: NoteMate app setup"', checklist: ['Install Git', 'Configure username/email', 'Make first repository commit'], resources: ['Git Handbook'] },
          { id: 'l10', title: 'Build and run your first debug APK', slug: 'build-and-run-your-first-debug-apk', summary: 'Compile your project into a debug APK and test it directly on your computer or phone.', order_index: 5, duration: '12 min', content: '# Debug APKs\n\nGenerating a debug APK allows you to share your work-in-progress with friends or test on a physical Android device via USB debugging.', code: './gradlew assembleDebug', checklist: ['Enable USB debugging on phone', 'Connect device via USB', 'Install debug APK'], resources: ['APK Distribution Guide'] },
        ]
      },
      {
        id: 'm3',
        title: 'Build the App Interface',
        description: 'Learn Kotlin fundamentals and design responsive layouts with Jetpack Compose.',
        order_index: 3,
        lessons: [
          { id: 'l11', title: 'Kotlin syntax essentials for UI', slug: 'kotlin-syntax-essentials-for-ui', summary: 'Master variables, functions, lambdas, and null safety in Kotlin.', order_index: 1, duration: '15 min', content: '# Kotlin Syntax Essentials\n\nKotlin is concise, safe, and expressive. Learn val vs var, null safety (`?`), and lambda syntax.', code: 'val appName: String = "NoteMate"\nvar noteCount: Int = 0\n\nfun getGreeting(name: String?): String {\n    return "Hello, ${name ?: "Creator"}"\n}', checklist: ['Understand val vs var', 'Use null safety operators', 'Write a simple Kotlin function'], resources: ['Kotlin Playground'] },
          { id: 'l12', title: 'Jetpack Compose layouts: Column and Row', slug: 'jetpack-compose-layouts-column-and-row', summary: 'Arrange UI elements vertically and horizontally using Compose layout containers.', order_index: 2, duration: '18 min', content: '# Column and Row Layouts\n\nIn Compose, UI is built with composable functions. `Column` stacks items vertically; `Row` places them side by side.', code: '@Composable\nfun NoteCard(title: String) {\n    Column(modifier = Modifier.padding(16.dp)) {\n        Text(text = title, fontWeight = FontWeight.Bold)\n        Spacer(modifier = Modifier.height(8.dp))\n        Button(onClick = { }) { Text("Open") }\n    }\n}', checklist: ['Create a Column layout', 'Add a Row layout', 'Apply padding and spacing'], resources: ['Compose Layouts Documentation'] },
          { id: 'l13', title: 'Styling with Material 3 typography and colors', slug: 'styling-with-material-3-typography-and-colors', summary: 'Apply Google Material 3 design tokens, custom color palettes, and typography.', order_index: 3, duration: '15 min', content: '# Material 3 Styling\n\nMaterial 3 provides dynamic color support, clean typography scales, and accessible contrast ratios.', code: '@Composable\nfun ShipItTheme(content: @Composable () -> Unit) {\n    MaterialTheme(\n        colorScheme = lightColorScheme(primary = Color(0xFF2563EB)),\n        content = content\n    )\n}', checklist: ['Define primary color scheme', 'Apply typography styles', 'Test dark mode colors'], resources: ['Material 3 Guidelines'] },
          { id: 'l14', title: 'Handling user input with TextField and buttons', slug: 'handling-user-input-with-textfield-and-buttons', summary: 'Capture user text input reactively using mutable state in Jetpack Compose.', order_index: 4, duration: '18 min', content: '# Reactive TextFields\n\nIn Compose, state drives UI. Use `remember { mutableStateOf("") }` to capture typing.', code: '@Composable\nfun NoteInput() {\n    var text by remember { mutableStateOf("") }\n    OutlinedTextField(value = text, onValueChange = { text = it }, label = { Text("Note title") })\n}', checklist: ['Create mutable state variable', 'Bind OutlinedTextField', 'Trigger action on button click'], resources: ['Compose State Codelab'] },
          { id: 'l15', title: 'Building the NoteMate home screen', slug: 'building-the-notemate-home-screen', summary: 'Combine lists, app bars, and Floating Action Buttons into a complete screen layout.', order_index: 5, duration: '20 min', content: '# NoteMate Home Screen\n\nBring everything together into a polished dashboard screen with a top app bar, scrollable note list, and FAB.', code: '@Composable\nfun HomeScreen() {\n    Scaffold(\n        topBar = { TopAppBar(title = { Text("NoteMate") }) },\n        floatingActionButton = { FloatingActionButton(onClick = {}) { Icon(Icons.Default.Add, "") } }\n    ) { padding ->\n        LazyColumn(modifier = Modifier.padding(padding)) {\n            items(5) { index -> NoteItem(index)\n }\n        }\n    }\n}', checklist: ['Implement Scaffold layout', 'Add LazyColumn for lists', 'Add FloatingActionButton'], resources: ['Scaffold API Reference'] },
        ]
      },
      {
        id: 'm4',
        title: 'Add Logic and Data',
        description: 'Manage app state, implement local storage, and handle user actions seamlessly.',
        order_index: 4,
        lessons: [
          { id: 'l16', title: 'Managing app state with ViewModel', slug: 'managing-app-state-with-viewmodel', summary: 'Separate business logic from UI using Android ViewModels and StateFlow.', order_index: 1, duration: '18 min', content: '# Android ViewModels\n\nViewModels survive configuration changes (like screen rotation) and store UI state safely.', code: 'class NoteViewModel : ViewModel() {\n    private val _notes = MutableStateFlow<List<String>>(emptyList())\n    val notes: StateFlow<List<String>> = _notes.asStateFlow()\n    \n    fun addNote(note: String) {\n        _notes.value = _notes.value + note\n    }\n}', checklist: ['Create NoteViewModel class', 'Define StateFlow state', 'Expose read-only state to UI'], resources: ['ViewModel Guide'] },
          { id: 'l17', title: 'Local persistence with Room database', slug: 'local-persistence-with-room-database', summary: 'Store notes permanently on the device using SQLite via Room ORM.', order_index: 2, duration: '22 min', content: '# Room Database\n\nRoom provides an abstraction layer over SQLite allowing fluent database access.', code: '@Entity(tableName = "notes")\ndata class NoteEntity(\n    @PrimaryKey(autoGenerate = true) val id: Long = 0,\n    val title: String,\n    val content: String\n)', checklist: ['Define @Entity model', 'Create @Dao interface', 'Initialize RoomDatabase instance'], resources: ['Room Persistence Codelab'] },
          { id: 'l18', title: 'Connecting UI to database state', slug: 'connecting-ui-to-database-state', summary: 'Observe database changes reactively and display notes in real-time.', order_index: 3, duration: '18 min', content: '# Reactive Data Flow\n\nUse `.collectAsState()` in Compose to automatically re-render when notes change in the database.', code: '@Composable\nfun NoteListScreen(viewModel: NoteViewModel) {\n    val notes by viewModel.notes.collectAsState()\n    LazyColumn {\n        items(notes) { note -> Text(note) }\n    }\n}', checklist: ['Collect flow as Compose state', 'Display dynamic note list', 'Handle empty states'], resources: ['Compose & Flow Guide'] },
          { id: 'l19', title: 'Adding delete and edit actions', slug: 'adding-delete-and-edit-actions', summary: 'Implement swipe-to-delete and edit dialogs for user notes.', order_index: 4, duration: '15 min', content: '# CRUD Operations\n\nAllow users to update existing notes or remove them when no longer needed.', code: 'fun deleteNote(noteId: Long) {\n    viewModelScope.launch {\n        noteDao.delete(noteId)\n    }\n}', checklist: ['Add delete button handler', 'Implement edit note dialog', 'Verify database updates'], resources: ['CRUD Best Practices'] },
          { id: 'l20', title: 'Handling app lifecycle and data persistence', slug: 'handling-app-lifecycle-and-data-persistence', summary: 'Save state correctly when users switch apps or close NoteMate.', order_index: 5, duration: '15 min', content: '# App Lifecycle\n\nUnderstand onStart, onResume, onPause, and onStop to prevent data loss.', code: 'override fun onPause() {\n    super.onPause()\n    savePendingChanges()\n}', checklist: ['Handle configuration changes', 'Save unsaved notes on pause', 'Test app backgrounding'], resources: ['Android Lifecycle Documentation'] },
        ]
      },
      {
        id: 'm5',
        title: 'Test and Improve',
        description: 'Run diagnostics, fix edge cases, polish accessibility, and add custom branding.',
        order_index: 5,
        lessons: [
          { id: 'l21', title: 'Debugging common Android crashes', slug: 'debugging-common-android-achrashes', summary: 'Read Logcat error traces, fix NullPointerExceptions, and resolve Gradle build errors.', order_index: 1, duration: '15 min', content: '# Logcat & Debugging\n\nWhen your app crashes, Logcat is your best friend. Learn how to filter by error level and find stack traces.', code: '// Logcat debug statement\nLog.d("NoteMate", "Successfully saved note: $title")', checklist: ['Open Logcat in Android Studio', 'Filter by FATAL errors', 'Fix null pointer exception'], resources: ['Logcat Filtering Guide'] },
          { id: 'l22', title: 'Writing UI tests with Compose JUnit', slug: 'writing-ui-tests-with-compose-junit', summary: 'Write automated unit and UI tests to verify your screens render correctly.', order_index: 2, duration: '18 min', content: '# Compose Testing\n\nVerify button clicks, text input, and layout rendering automatically using ComposeTestRule.', code: '@get:Rule\nval composeTestRule = createComposeRule()\n\n@Test\nfun testNoteCreation() {\n    composeTestRule.setContent { NoteMateApp() }\n    composeTestRule.onNodeWithText("New Note").performClick()\n}', checklist: ['Create test file', 'Simulate button click', 'Assert UI element exists'], resources: ['Compose Testing Codelab'] },
          { id: 'l23', title: 'Accessibility and screen reader support', slug: 'accessibility-and-screen-reader-support', summary: 'Add content descriptions and ensure high contrast for visually impaired users.', order_index: 3, duration: '12 min', content: '# Accessibility (a11y)\n\nEnsure buttons have clear content descriptions so TalkBack screen readers work flawlessly.', code: 'Image(\n    painter = painterDrawable,\n    contentDescription = stringResource(R.string.add_note_desc)\n)', checklist: ['Add content descriptions', 'Verify touch target sizes (48dp)', 'Check color contrast ratios'], resources: ['Android Accessibility Checklist'] },
          { id: 'l24', title: 'Polishing app icon and splash screen', slug: 'install-and-polish-app-icon', summary: 'Generate custom adaptive app icons and a smooth Android 12+ splash screen.', order_index: 4, duration: '15 min', content: '# App Icons & Splash\n\nFirst impressions matter. Create a professional adaptive icon using Android Studio Asset Studio.', code: '<!-- res/values/styles.xml -->\n<style name="Theme.App.Starting" parent="Theme.SplashScreen">\n    <item name="windowSplashScreenBackground">#2563EB</item>\n    <item name="windowSplashScreenAnimatedIcon">@drawable/ic_launcher_foreground</item>\n</style>', checklist: ['Generate adaptive icon', 'Configure splash screen theme', 'Test icon on multiple launchers'], resources: ['Splash Screen API Guide'] },
          { id: 'l25', title: 'Performance profiling and memory leaks', slug: 'performance-profiling-and-memory-leaks', summary: 'Use Android Studio Profiler to inspect CPU, memory, and battery usage.', order_index: 5, duration: '15 min', content: '# Profiling & Performance\n\nEnsure your app runs at a smooth 60/120fps without memory leaks or excessive battery consumption.', code: '// Check memory heap dump in Profiler\n// Inspect retained allocations', checklist: ['Open Android Studio Profiler', 'Check CPU usage during scroll', 'Inspect memory allocations'], resources: ['Android Profiler Documentation'] },
        ]
      },
      {
        id: 'm6',
        title: 'Deploy and Publish',
        description: 'Generate signed release bundles and publish your app live to the Google Play Store.',
        order_index: 6,
        lessons: [
          { id: 'l26', title: 'Preparing your Google Play Developer Account', slug: 'preparing-your-google-play-developer-account', summary: 'Set up your Google Play Console developer profile, pay registration fee, and verify identity.', order_index: 1, duration: '15 min', content: '# Play Console Account\n\nTo publish on Google Play, you need a developer account ($25 one-time registration fee) and identity verification.', code: '// Requirements:\n// 1. Google account\n// 2. Government ID verification\n// 3. $25 developer fee payment', checklist: ['Sign up for Play Console', 'Complete identity verification', 'Set developer profile name'], resources: ['Google Play Console Help'] },
          { id: 'l27', title: 'Generating a signed Android App Bundle (AAB)', slug: 'generating-a-signed-android-app-bundle', summary: 'Create a keystore, sign your release build, and generate an AAB for Google Play.', order_index: 2, duration: '20 min', content: '# Signed App Bundles (AAB)\n\nGoogle Play requires app bundles (.aab). You must sign your AAB with a private keystore file. Keep your keystore password secure!', code: './gradlew bundleRelease\n# Output: app/build/outputs/bundle/release/app-release.aab', checklist: ['Create release keystore', 'Configure signing config in gradle', 'Generate signed release AAB'], resources: ['Sign Your App Documentation'] },
          { id: 'l28', title: 'Writing store listing descriptions and screenshots', slug: 'writing-store-listing-descriptions-and-screenshots', summary: 'Craft compelling app store descriptions, feature graphics, and phone screenshots.', order_index: 3, duration: '20 min', content: '# Store Listing Optimization\n\nYour store listing is your landing page on Google Play. Highlight benefits clearly, use high-res screenshots, and pick relevant keywords.', code: '// Checklist:\n// - Short description (80 chars)\n// - Full description (4000 chars)\n// - Feature graphic (1024x500px)\n// - Phone screenshots (1080x1920px)', checklist: ['Write short & full descriptions', 'Capture 4 phone screenshots', 'Design 1024x500 feature graphic'], resources: ['Google Play Store Listing Guidelines'] },
          { id: 'l29', title: 'Setting up privacy policy and store compliance', slug: 'setting-up-privacy-policy-and-store-compliance', summary: 'Publish a compliant privacy policy and complete Google Play safety questionnaires.', order_index: 4, duration: '15 min', content: '# Privacy Policy & Compliance\n\nEvery app on Google Play that handles user data must have an accessible privacy policy URL and complete the Data Safety form.', code: '// Required items:\n// 1. Hosted Privacy Policy markdown/HTML page\n// 2. Content rating questionnaire\n// 3. Target audience declaration', checklist: ['Create privacy policy page', 'Complete Data Safety form', 'Submit content rating questionnaire'], resources: ['Google Play Policy Center'] },
          { id: 'l30', title: 'Submitting your app for review and launch', slug: 'submitting-your-app-for-review-and-launch', summary: 'Upload your AAB to production/internal testing track and submit for Google review.', order_index: 5, duration: '15 min', content: '# Launch Day!\n\nUpload your signed AAB to the Google Play Console, review release details, and click **Send for Review**. Congratulations, you are a published Android developer!', code: './gradlew publishRelease\n// Status: In Review -> Published!', checklist: ['Upload AAB to Play Console', 'Complete pre-launch report checks', 'Click Submit for Review'], resources: ['Google Play Launch Checklist'] },
        ]
      }
    ]
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('shipit_dark') === 'true';
  });

  // Persistent mock user & app state
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('shipit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [onboardingData, setOnboardingData] = useState(() => {
    const saved = localStorage.getItem('shipit_onboarding');
    return saved ? JSON.parse(saved) : { completed: false, experience: 'beginner', goal: 'build_app', hours: '5' };
  });

  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('shipit_completed_lessons');
    return saved ? JSON.parse(saved) : {};
  });

  const [checklists, setChecklists] = useState<Record<string, Record<number, boolean>>>(() => {
    const saved = localStorage.getItem('shipit_checklists');
    return saved ? JSON.parse(saved) : {};
  });

  const [projectData, setProjectData] = useState(() => {
    const saved = localStorage.getItem('shipit_project');
    return saved ? JSON.parse(saved) : null;
  });

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
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem('shipit_dark', String(nextDark));
    document.documentElement.classList.toggle('dark', nextDark);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [isDarkMode]);

  const isProtected = [
    '/dashboard',
    '/roadmap',
    '/onboarding',
    '/project',
    '/settings',
    '/certificates'
  ].includes(currentPath) || currentPath.startsWith('/lessons/') || currentPath.startsWith('/quiz/');

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
      howSubtitle: 'Kafofin tafiyarku ta mataki 4 don zama mai buga manhajar Android.',
      finalCtaTitle: 'Fara gina manhajarka ta farko a yau.',
      finalCtaSub: 'Kasance tare da dubban ɗalibai masu kishi waɗanda suka canza raoyinsu zuwa gaskiya.',
      loginTitle: 'Barka da dawowa ShipIt Academy',
      signupTitle: 'Ƙirƙiri kyautar asusunka',
      forgotTitle: 'Sake saita kalmar sirrinka',
    },
  };

  const t = translations[currentLang] || translations.en;

  // Render content based on current path
  const renderPage = () => {
    // LESSON PAGE /lessons/[slug]
    if (currentPath.startsWith('/lessons/')) {
      const slug = currentPath.replace('/lessons/', '');
      let foundLesson: any = null;
      let foundModule: any = null;
      
      for (const mod of COURSES_DATA[0].modules) {
        const l = mod.lessons.find((les) => les.slug === slug);
        if (l) {
          foundLesson = l;
          foundModule = mod;
          break;
        }
      }

      if (!foundLesson) {
        return (
          <div className="py-20 text-center">
            <Container size="md">
              <Card className="space-y-4 py-16">
                <h2 className="text-2xl font-bold">Lesson Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400">The requested lesson could not be found.</p>
                <Button variant="primary" onClick={() => navigate('/roadmap')}>Back to Roadmap</Button>
              </Card>
            </Container>
          </div>
        );
      }

      const isCompleted = !!completedLessons[foundLesson.id];
      const lessonChecklist = checklists[foundLesson.id] || {};

      const toggleChecklist = (index: number) => {
        const updated = {
          ...checklists,
          [foundLesson.id]: {
            ...lessonChecklist,
            [index]: !lessonChecklist[index]
          }
        };
        setChecklists(updated);
        localStorage.setItem('shipit_checklists', JSON.stringify(updated));
      };

      const toggleComplete = () => {
        const updated = {
          ...completedLessons,
          [foundLesson.id]: !isCompleted
        };
        setCompletedLessons(updated);
        localStorage.setItem('shipit_completed_lessons', JSON.stringify(updated));
      };

      return (
        <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Container size="lg">
            <div className="mb-6 flex items-center justify-between">
              <button 
                onClick={() => navigate('/roadmap')} 
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Roadmap
              </button>
              <div className="text-xs font-mono text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                {foundModule.title} • {foundLesson.duration}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Lesson {foundLesson.order_index}</span>
                      <button 
                        onClick={toggleComplete}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all ${isCompleted ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'}`}
                      >
                        {isCompleted ? <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" /> : <Square className="w-3.5 h-3.5 mr-1" />}
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{foundLesson.title}</h1>
                    <p className="text-base text-gray-600 dark:text-gray-300">{foundLesson.summary}</p>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-800" />

                  {/* Markdown content */}
                  <div className="prose dark:prose-invert max-w-none space-y-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {foundLesson.content.split('\n\n').map((paragraph: string, idx: number) => {
                      if (paragraph.startsWith('# ')) {
                        return <h2 key={idx} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{paragraph.replace('# ', '')}</h2>;
                      }
                      if (paragraph.startsWith('## ')) {
                        return <h3 key={idx} className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">{paragraph.replace('## ', '')}</h3>;
                      }
                      if (paragraph.startsWith('### ')) {
                        return <h4 key={idx} className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">{paragraph.replace('### ', '')}</h4>;
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>

                  {/* Code snippet */}
                  {foundLesson.code && (
                    <div className="space-y-2 pt-4">
                      <div className="flex items-center justify-between text-xs font-mono text-gray-500 bg-gray-900 text-gray-300 px-4 py-2 rounded-t-xl">
                        <span>Kotlin Code Snippet</span>
                        <span>MainActivity.kt</span>
                      </div>
                      <pre className="bg-gray-950 text-emerald-400 p-4 rounded-b-xl overflow-x-auto text-xs font-mono">
                        <code>{foundLesson.code}</code>
                      </pre>
                    </div>
                  )}
                </Card>
              </div>

              {/* Sidebar Checklist & Resources */}
              <div className="space-y-6">
                <Card className="space-y-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                    <CheckSquare className="w-5 h-5 mr-2 text-blue-600" /> Lesson Checklist
                  </h3>
                  <div className="space-y-2">
                    {foundLesson.checklist.map((item: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => toggleChecklist(idx)}
                        className="w-full text-left flex items-start space-x-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-xs"
                      >
                        {lessonChecklist[idx] ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        )}
                        <span className={lessonChecklist[idx] ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}>
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="space-y-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-emerald-500" /> Helpful Resources
                  </h3>
                  <div className="space-y-2">
                    {foundLesson.resources.map((res: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-800 dark:text-blue-300 font-medium">
                        {res}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="pt-2">
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full"
                    onClick={() => navigate('/roadmap')}
                  >
                    Return to Roadmap
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    switch (currentPath) {
      case '/':
        return (
          <div>
            {/* Hero Section */}
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
                      <Button variant="primary" size="lg" onClick={() => navigate(user ? '/dashboard' : '/signup')}>
                        {t.startFree} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => navigate('/roadmap')}>
                        {t.viewCurriculum}
                      </Button>
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

            {/* What you will learn */}
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
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const emailInput = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value || 'learner@shipit.academy';
                  setUser({ email: emailInput, name: emailInput.split('@')[0] });
                  localStorage.setItem('shipit_user', JSON.stringify({ email: emailInput, name: emailInput.split('@')[0] }));
                  navigate(onboardingData.completed ? '/dashboard' : '/onboarding'); 
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input name="email" type="email" required defaultValue="learner@shipit.academy" placeholder="you@example.com" className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                      <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input name="password" type="password" required defaultValue="password123" placeholder="••••••••" className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const nameInput = (e.currentTarget.elements.namedItem('fullname') as HTMLInputElement)?.value || 'Android Creator';
                  const emailInput = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value || 'creator@shipit.academy';
                  setUser({ email: emailInput, name: nameInput });
                  localStorage.setItem('shipit_user', JSON.stringify({ email: emailInput, name: nameInput }));
                  navigate('/onboarding'); 
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full name</label>
                    <input name="fullname" type="text" required defaultValue="Android Creator" placeholder="John Doe" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <input name="email" type="email" required defaultValue="creator@shipit.academy" placeholder="you@example.com" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input name="password" type="password" required defaultValue="password123" placeholder="••••••••" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

      case '/onboarding':
        return (
          <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Container size="sm">
              <Card className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to ShipIt Academy</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Let's personalize your Android learning journey.</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const exp = (form.elements.namedItem('experience') as HTMLSelectElement)?.value || 'beginner';
                  const goal = (form.elements.namedItem('goal') as HTMLSelectElement)?.value || 'build_app';
                  const hours = (form.elements.namedItem('hours') as HTMLSelectElement)?.value || '5';
                  
                  const updated = { completed: true, experience: exp, goal, hours };
                  setOnboardingData(updated);
                  localStorage.setItem('shipit_onboarding', JSON.stringify(updated));
                  navigate('/dashboard');
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">What is your coding experience?</label>
                    <select name="experience" defaultValue={onboardingData.experience} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <option value="beginner">Complete beginner (Zero coding experience)</option>
                      <option value="some_coding">Know basic programming (HTML, Python, or JS)</option>
                      <option value="experienced">Experienced developer (New to Android/Kotlin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">What is your main goal?</label>
                    <select name="goal" defaultValue={onboardingData.goal} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <option value="build_app">Build and publish my own app idea</option>
                      <option value="career">Land a mobile engineering job</option>
                      <option value="hobby">Learn Android development as a hobby</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">How many hours can you dedicate weekly?</label>
                    <select name="hours" defaultValue={onboardingData.hours} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <option value="3">3 hours / week (Casual)</option>
                      <option value="5">5 hours / week (Recommended)</option>
                      <option value="10">10+ hours / week (Fast track)</option>
                    </select>
                  </div>

                  <Button variant="primary" size="md" className="w-full">Save & Enter Dashboard</Button>
                </form>
              </Card>
            </Container>
          </div>
        );

      case '/dashboard': {
        let totalLessons = 30;
        let completedCount = Object.values(completedLessons).filter(Boolean).length;
        let progressPct = Math.round((completedCount / totalLessons) * 100);

        // Find first incomplete lesson
        let nextLesson: any = COURSES_DATA[0].modules[0].lessons[0];
        for (const mod of COURSES_DATA[0].modules) {
          for (const les of mod.lessons) {
            if (!completedLessons[les.id]) {
              nextLesson = les;
              break;
            }
          }
          if (nextLesson) break;
        }

        return (
          <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Container size="lg" className="space-y-8">
              {/* Welcome Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Learner Dashboard</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back, {user?.name || 'Android Creator'}! 👋</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">You are on track to publish your first Android app.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="primary" size="sm" onClick={() => navigate('/roadmap')}>
                    View Roadmap
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/project')}>
                    My Project
                  </Button>
                </div>
              </div>

              {/* Progress & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="space-y-2">
                  <span className="text-xs font-semibold text-gray-500">Overall Progress</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{progressPct}%</span>
                    <span className="text-xs text-emerald-600 font-semibold">{completedCount} of 30 lessons</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${progressPct}%` }}></div>
                  </div>
                </Card>

                <Card className="space-y-2">
                  <span className="text-xs font-semibold text-gray-500">Weekly Commitment</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{onboardingData.hours} hrs</span>
                    <span className="text-xs text-blue-600 font-semibold">Goal: {onboardingData.goal.replace('_', ' ')}</span>
                  </div>
                  <p className="text-xs text-gray-500">Experience level: {onboardingData.experience}</p>
                </Card>

                <Card className="space-y-2">
                  <span className="text-xs font-semibold text-gray-500">Quizzes & Certs</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">6 Modules</span>
                    <button onClick={() => navigate('/certificates')} className="text-xs text-blue-600 font-semibold hover:underline">View Certificate →</button>
                  </div>
                  <p className="text-xs text-gray-500">Complete all 30 lessons & quizzes to unlock.</p>
                </Card>
              </div>

              {/* Next Lesson Card */}
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 sm:p-8 space-y-4 shadow-lg">
                <div className="inline-flex items-center space-x-2 bg-blue-500/40 px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Continue Learning</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{nextLesson.title}</h2>
                  <p className="text-sm text-blue-100 max-w-2xl">{nextLesson.summary}</p>
                </div>
                <div className="pt-2">
                  <Button variant="secondary" size="md" onClick={() => navigate(`/lessons/${nextLesson.slug}`)}>
                    Start Lesson <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Quick Navigation grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="space-y-3 cursor-pointer hover:border-blue-500 transition-all" onClick={() => navigate('/roadmap')}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Full Roadmap</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Explore all 6 modules and 30 interactive lessons.</p>
                </Card>

                <Card className="space-y-3 cursor-pointer hover:border-emerald-500 transition-all" onClick={() => navigate('/project')}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Project Workspace</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Define your app idea, features, screens, and release checklist.</p>
                </Card>

                <Card className="space-y-3 cursor-pointer hover:border-purple-500 transition-all" onClick={() => navigate('/settings')}>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
                    <SettingsIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Account Settings</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Update your profile, change password, or manage preferences.</p>
                </Card>
              </div>
            </Container>
          </div>
        );
      }

      case '/roadmap': {
        let totalLessons = 30;
        let completedCount = Object.values(completedLessons).filter(Boolean).length;
        let progressPct = Math.round((completedCount / totalLessons) * 100);

        return (
          <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Container size="lg" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Curriculum Roadmap</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Build & Publish Your First Android App</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">6 Modules • 30 Lessons • Complete all to unlock your certificate.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-gray-500">Progress</span>
                    <p className="text-lg font-bold text-blue-600">{completedCount} / 30 ({progressPct}%)</p>
                  </div>
                </div>
              </div>

              {/* Modules list */}
              <div className="space-y-6">
                {COURSES_DATA[0].modules.map((mod, modIdx) => {
                  let modCompleted = mod.lessons.filter((l) => completedLessons[l.id]).length;
                  let modPct = Math.round((modCompleted / mod.lessons.length) * 100);

                  return (
                    <Card key={mod.id} className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-100 dark:border-gray-800 gap-2">
                        <div>
                          <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">Module {modIdx + 1}</span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mod.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{mod.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold text-gray-500">{modCompleted}/{mod.lessons.length} done ({modPct}%)</span>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/quiz/${mod.id}`)}>
                            Module Quiz
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {mod.lessons.map((lesson) => {
                          const isDone = !!completedLessons[lesson.id];
                          return (
                            <div 
                              key={lesson.id}
                              onClick={() => navigate(`/lessons/${lesson.slug}`)}
                              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 border border-gray-200 dark:border-gray-700/50 cursor-pointer transition-all"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                  {isDone ? '✓' : lesson.order_index}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{lesson.title}</h4>
                                  <p className="text-[11px] text-gray-500">{lesson.duration} • {lesson.summary.substring(0, 60)}...</p>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Container>
          </div>
        );
      }

      case '/project': {
        const [appName, setAppName] = useState(projectData?.name || 'NoteMate');
        const [appIdea, setAppIdea] = useState(projectData?.idea || 'An offline-first Kotlin note-taking app with Jetpack Compose.');
        const [features, setFeatures] = useState<string[]>(projectData?.features || ['Create and edit notes', 'Room local database', 'Dark mode support']);
        const [newFeature, setNewFeature] = useState('');
        const [screens, setScreens] = useState<string[]>(projectData?.screens || ['Home Screen', 'Note Editor Screen', 'Settings Screen']);
        const [newScreen, setNewScreen] = useState('');

        const saveProject = (e: React.FormEvent) => {
          e.preventDefault();
          const p = { name: appName, idea: appIdea, features, screens };
          setProjectData(p);
          localStorage.setItem('shipit_project', JSON.stringify(p));
          alert('Project workspace saved successfully!');
        };

        return (
          <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Container size="md">
              <Card className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Project Workspace</span>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Define Your Android App</h1>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                </div>

                <form onSubmit={saveProject} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">App Name</label>
                      <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} required className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">App Idea / Problem Solved</label>
                      <textarea value={appIdea} onChange={(e) => setAppIdea(e.target.value)} rows={3} required className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Core Features (MVP)</label>
                      <div className="space-y-2 mb-2">
                        {features.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg text-xs">
                            <span>{f}</span>
                            <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== idx))} className="text-red-500 hover:underline">Remove</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add new feature..." className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                        <Button type="button" variant="secondary" size="sm" onClick={() => { if(newFeature) { setFeatures([...features, newFeature]); setNewFeature(''); }}}>+</Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">App Screens</label>
                      <div className="space-y-2 mb-2">
                        {screens.map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg text-xs">
                            <span>{s}</span>
                            <button type="button" onClick={() => setScreens(screens.filter((_, i) => i !== idx))} className="text-red-500 hover:underline">Remove</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input type="text" value={newScreen} onChange={(e) => setNewScreen(e.target.value)} placeholder="Add new screen..." className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                        <Button type="button" variant="secondary" size="sm" onClick={() => { if(newScreen) { setScreens([...screens, newScreen]); setNewScreen(''); }}}>+</Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" size="md" className="w-full">Save Project Workspace</Button>
                </form>
              </Card>
            </Container>
          </div>
        );
      }

      case '/settings':
        return (
          <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Container size="sm" className="space-y-6">
              <Card className="space-y-6">
                <div className="text-center space-y-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your profile and password.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input type="text" defaultValue={user?.name || 'Android Creator'} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input type="email" disabled defaultValue={user?.email || 'creator@shipit.academy'} className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500" />
                  </div>
                  <Button variant="primary" size="md" className="w-full">Update Profile</Button>
                </form>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Change Password</h3>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Password updated successfully!'); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                      <input type="password" required placeholder="••••••••" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                      <input type="password" required placeholder="••••••••" className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                    </div>
                    <Button variant="secondary" size="md" className="w-full">Update Password</Button>
                  </form>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    size="md" 
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => { setUser(null); localStorage.removeItem('shipit_user'); navigate('/'); }}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Log Out
                  </Button>
                </div>
              </Card>
            </Container>
          </div>
        );

      case '/certificates':
        return (
          <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <Container size="md">
              <Card className="text-center py-16 space-y-6 border-2 border-amber-500/50 bg-gradient-to-b from-amber-50/20 to-transparent">
                <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-xl">
                  <Award className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">Certificate of Completion</span>
                  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">ShipIt Academy Graduate</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    This certifies that <strong className="text-gray-900 dark:text-white">{user?.name || 'Android Creator'}</strong> has successfully mastered Kotlin, Jetpack Compose, and successfully published their first Android app to Google Play.
                  </p>
                </div>
                <div className="pt-4 flex justify-center space-x-4">
                  <Button variant="primary" size="sm" onClick={() => alert('Certificate downloaded as PDF!')}>
                    Download PDF Certificate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                    Return to Dashboard
                  </Button>
                </div>
              </Card>
            </Container>
          </div>
        );

      default:
        // Check if quiz route
        if (currentPath.startsWith('/quiz/')) {
          const modId = currentPath.replace('/quiz/', '');
          return (
            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
              <Container size="sm">
                <Card className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono uppercase text-blue-600 font-bold">Module Knowledge Check</span>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Module Quiz</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Answer 5 questions to test your understanding.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Question 1 of 5: What is the official UI toolkit recommended by Google for Android?</p>
                      <div className="space-y-2 pt-2">
                        <button onClick={() => alert('Correct!')} className="w-full text-left p-2.5 rounded-lg bg-white dark:bg-gray-800 border text-xs hover:border-blue-500">A) Jetpack Compose</button>
                        <button onClick={() => alert('Incorrect.')} className="w-full text-left p-2.5 rounded-lg bg-white dark:bg-gray-800 border text-xs hover:border-blue-500">B) Adobe Flash</button>
                        <button onClick={() => alert('Incorrect.')} className="w-full text-left p-2.5 rounded-lg bg-white dark:bg-gray-800 border text-xs hover:border-blue-500">C) Windows Forms</button>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="md" className="w-full" onClick={() => navigate('/roadmap')}>Submit & Return to Roadmap</Button>
                </Card>
              </Container>
            </div>
          );
        }

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
      {isProtected && user ? (
        <ProtectedHeader fullName={user.name} />
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
