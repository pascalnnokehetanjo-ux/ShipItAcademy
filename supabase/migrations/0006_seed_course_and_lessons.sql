-- 0006_seed_course_and_lessons.sql
-- Seed the main course, 6 modules, and 30 published lessons

DO $$
DECLARE
    v_course_id uuid;
    v_m1 uuid;
    v_m2 uuid;
    v_m3 uuid;
    v_m4 uuid;
    v_m5 uuid;
    v_m6 uuid;
BEGIN
    -- 1. Insert Course
    INSERT INTO courses (title, slug, description, is_free, status, order_index)
    VALUES (
        'Build and Publish Your First Android App',
        'build-publish-first-android-app',
        'Learn how to build a real Android app using Kotlin and Jetpack Compose, then prepare and publish it to Google Play.',
        true,
        'published',
        1
    )
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_course_id;

    -- If already existed, fetch its ID
    IF v_course_id IS NULL THEN
        SELECT id INTO v_course_id FROM courses WHERE slug = 'build-publish-first-android-app';
    END IF;

    -- 2. Insert 6 Modules
    INSERT INTO modules (course_id, title, description, order_index)
    VALUES 
        (v_course_id, 'Prepare Your App Idea', 'Validate your concept, define target users, and plan your core feature set.', 1),
        (v_course_id, 'Set Up Your Development Environment', 'Install Android Studio, configure emulators, and master Git version control.', 2),
        (v_course_id, 'Build the App Interface', 'Learn Kotlin fundamentals and design responsive layouts with Jetpack Compose.', 3),
        (v_course_id, 'Add Logic and Data', 'Manage app state, implement local storage, and handle user actions seamlessly.', 4),
        (v_course_id, 'Test and Improve', 'Run diagnostics, fix edge cases, polish accessibility, and add custom branding.', 5),
        (v_course_id, 'Deploy and Publish', 'Generate signed release bundles and publish your app live to the Google Play Store.', 6)
    ON CONFLICT DO NOTHING;

    -- Fetch module IDs
    SELECT id INTO v_m1 FROM modules WHERE course_id = v_course_id AND order_index = 1;
    SELECT id INTO v_m2 FROM modules WHERE course_id = v_course_id AND order_index = 2;
    SELECT id INTO v_m3 FROM modules WHERE course_id = v_course_id AND order_index = 3;
    SELECT id INTO v_m4 FROM modules WHERE course_id = v_course_id AND order_index = 4;
    SELECT id INTO v_m5 FROM modules WHERE course_id = v_course_id AND order_index = 5;
    SELECT id INTO v_m6 FROM modules WHERE course_id = v_course_id AND order_index = 6;

    -- 3. Insert 30 Lessons
    -- Module 1: Lessons 1-5
    INSERT INTO lessons (module_id, title, slug, summary, content_md, code_snippet, checklist, resources, estimated_minutes, order_index, status)
    VALUES 
    (
        v_m1,
        'Understand what an app really is',
        'understand-what-an-app-really-is',
        'Learn the essential parts of every app: interface, logic, data, testing, deployment, and publication.',
        '# Understand what an app really is

An app is more than a screen. When someone opens an app, several parts work together.

## The main parts of an app

### 1. User interface
The user interface, or UI, is what the user sees and touches: buttons, text, forms, images, and screens.

### 2. App logic
App logic decides what happens when the user taps something. For example, tapping **Save** may check whether the title is empty, save the note, and return to the home screen.

### 3. Data
Data is the information your app stores. In a note-taking app, data includes note titles, note content, and creation dates.

### 4. Testing
Testing helps you find problems before users do. You will test creating, editing, deleting, and searching notes.

### 5. Deployment
Deployment means making your app available outside your development computer. For Android, this usually means creating a release build and uploading it to Google Play.

## The app-building journey

You will follow this path:

1. Choose a small app idea.
2. Install your tools.
3. Build the user interface.
4. Add logic and save data.
5. Test the app.
6. Prepare it for Google Play.
7. Publish it.

## Your first app

In this course, you will build **NoteMate**, a simple offline note-taking app.

NoteMate will let users:

- Create notes
- Edit notes
- Delete notes
- Search notes
- Keep notes after closing the app

## Activity

Write down one app idea you could build in two weeks.

Keep it small. Do not try to build the next Facebook, WhatsApp, or Uber.

Examples:

- A note-taking app
- A habit tracker
- A flashcards app
- A simple expense logger
- A class timetable app',
        'data class Note(
    val id: Int,
    val title: String,
    val content: String
)',
        '["Understand the 5 core parts of a mobile app", "Identify the components of NoteMate", "Write down your own simple 2-week app idea"]'::jsonb,
        '[{"title": "Android Developer Fundamentals", "url": "https://developer.android.com/courses"}]'::jsonb,
        15,
        1,
        'published'
    ),
    (
        v_m1,
        'Choose one small app to build',
        'choose-one-small-app-to-build',
        'Select a focused, high-impact app scope that you can realistically complete without getting overwhelmed.',
        '# Choose one small app to build

When starting out as an Android developer, scoping is everything. Many beginners fail because they try to build complex multi-sided marketplaces on day one.

## The Rule of One

Your first app should do **one thing exceptionally well**.

- Instead of a social network, build a **daily gratitude journal**.
- Instead of a full e-commerce store, build a **local grocery checklist**.
- Instead of a fitness suite, build a **water intake reminder**.

## Defining Scope

1. **Core Feature**: The single primary action users perform (e.g. creating a note).
2. **Secondary Feature**: Optional enhancements (e.g. dark mode, searching).
3. **Out of Scope**: Cloud sync, user accounts, push notifications (for now).',
        '// Keep scope minimal and focused
val maxNotesAllowed = 100',
        '["List 3 potential app ideas", "Evaluate each idea against the Rule of One", "Select your final app for the course"]'::jsonb,
        '[{"title": "Product Scoping Guide", "url": "https://developer.android.com"}]'::jsonb,
        15,
        2,
        'published'
    ),
    (
        v_m1,
        'Define users, problem, and features',
        'define-users-problem-and-features',
        'Clearly identify who your app is for, what pain point it solves, and your essential feature list.',
        '# Define users, problem, and features

To build an app people love, you must understand who will use it and why.

## User Persona
Who is your ideal user? For NoteMate, it is busy students and professionals who need a fast, distraction-free way to jot down ideas offline.

## Problem Statement
What frustration are you eliminating? Slow, bloated apps with unnecessary signups and ads.

## Feature Prioritization
Categorize your features into **Must Have**, **Should Have**, and **Later**.',
        '// Feature priority model
enum class Priority { MUST_HAVE, SHOULD_HAVE, LATER }',
        '["Define your target user", "Write down the core problem", "List 3 must-have features"]'::jsonb,
        '[]'::jsonb,
        20,
        3,
        'published'
    ),
    (
        v_m1,
        'Sketch your app screens',
        'sketch-your-app-screens',
        'Create wireframes and layout sketches to map out user navigation and screen flow.',
        '# Sketch your app screens

Before writing code, sketch your user interface on paper or in a digital wireframing tool.

## Key Screens for NoteMate
1. **Home Screen**: Displays the list of all notes with a floating action button to add new ones.
2. **Detail / Edit Screen**: Allows typing the note title and body.
3. **Search Screen**: Instant filtering of notes by keyword.',
        '// Screen navigation route constants
object Routes {
    const val HOME = "home"
    const val DETAIL = "detail"
}',
        '["Sketch home screen layout", "Sketch detail screen layout", "Map out button navigation flows"]'::jsonb,
        '[]'::jsonb,
        20,
        4,
        'published'
    ),
    (
        v_m1,
        'Understand Kotlin, Jetpack Compose, and Android Studio',
        'understand-kotlin-compose-android-studio',
        'Get familiar with the modern Android technology stack: Kotlin, Jetpack Compose, and Android Studio.',
        '# Understand Kotlin, Jetpack Compose, and Android Studio

Modern Android development relies on three foundational pillars:

1. **Kotlin**: A modern, concise, and safe programming language officially supported by Google for Android.
2. **Jetpack Compose**: Android’s modern declarative UI toolkit that lets you build native screens with less code.
3. **Android Studio**: The official Integrated Development Environment (IDE) equipped with emulators, debuggers, and layout previewers.',
        '// Jetpack Compose Composable example
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}',
        '["Learn the role of Kotlin", "Understand declarative UI with Jetpack Compose", "Explore Android Studio capabilities"]'::jsonb,
        '[{"title": "Kotlin Official Documentation", "url": "https://kotlinlang.org"}]'::jsonb,
        15,
        5,
        'published'
    ),

    -- Module 2: Lessons 6-10
    (
        v_m2,
        'Install Android Studio',
        'install-android-studio',
        'Download and set up Android Studio on your computer with all necessary SDK components.',
        '# Install Android Studio

Follow the steps to install Android Studio on Windows, macOS, or Linux.

1. Go to developer.android.com/studio.
2. Download the installer for your operating system.
3. Run the installer and complete the Setup Wizard, ensuring SDK components and Android Emulator are selected.',
        '// Check SDK version
println(android.os.Build.VERSION.SDK_INT)',
        '["Download Android Studio installer", "Complete setup wizard with recommended defaults", "Verify SDK installation"]'::jsonb,
        '[{"title": "Android Studio Download", "url": "https://developer.android.com/studio"}]'::jsonb,
        25,
        6,
        'published'
    ),
    (
        v_m2,
        'Create your first Android project',
        'create-your-first-android-project',
        'Initialize a new project in Android Studio using the Empty Activity template.',
        '# Create your first Android project

1. Open Android Studio and click **New Project**.
2. Select **Empty Activity** (Jetpack Compose).
3. Name your project **NoteMate**, set package name `com.shipit.academy.notemate`, and click Finish.',
        '// Project build.gradle.kts configuration
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}',
        '["Open Android Studio", "Create Empty Activity project", "Verify project structure in the left panel"]'::jsonb,
        '[]'::jsonb,
        20,
        7,
        'published'
    ),
    (
        v_m2,
        'Run your app in the emulator',
        'run-your-app-in-the-emulator',
        'Configure an Android Virtual Device (AVD) emulator and run your app.',
        '# Run your app in the emulator

1. Open Device Manager in Android Studio.
2. Create a virtual device (e.g. Pixel 6 running API 34).
3. Click the Green Play button to build and launch your app in the emulator.',
        '// Emulator logcat print
android.util.Log.d("NoteMate", "App started successfully in emulator")',
        '["Open Device Manager", "Download and launch virtual device", "Run app and verify preview"]'::jsonb,
        '[]'::jsonb,
        15,
        8,
        'published'
    ),
    (
        v_m2,
        'Run your app on a real Android phone',
        'run-your-app-on-a-real-android-phone',
        'Enable USB debugging on your physical Android device and test your app live.',
        '# Run your app on a real Android phone

1. Go to **Settings > About Phone** and tap **Build Number** 7 times to unlock Developer Options.
2. Enable **USB Debugging** in Developer Options.
3. Connect your phone via USB and select it as the deployment target in Android Studio.',
        '// Connected device verification',
        '["Enable Developer Options on phone", "Enable USB debugging", "Run app on physical device"]'::jsonb,
        '[]'::jsonb,
        20,
        9,
        'published'
    ),
    (
        v_m2,
        'Learn Git, GitHub, and project backups',
        'learn-git-github-and-project-backups',
        'Initialize Git version control and push your Android project to GitHub.',
        '# Learn Git, GitHub, and project backups

Version control is essential for safeguarding your code.

1. Open terminal in project root and run `git init`.
2. Create `.gitignore` to exclude build folders and local properties.
3. Commit and push your code to GitHub.',
        'git add .
git commit -m "Initial NoteMate commit"
git branch -M main
git remote add origin https://github.com/username/notemate.git
git push -u origin main',
        '["Initialize git in project", "Create robust .gitignore", "Commit and push to GitHub"]'::jsonb,
        '[]'::jsonb,
        20,
        10,
        'published'
    ),

    -- Module 3: Lessons 11-15
    (
        v_m3,
        'Kotlin basics for app building',
        'kotlin-basics-for-app-building',
        'Master variables, functions, data classes, and collections in Kotlin.',
        '# Kotlin basics for app building

Kotlin is expressive and concise. Let''s review core concepts needed for building apps.',
        'val title = "My First Note"
var count = 5
data class NoteItem(val id: Int, val text: String)',
        '["Understand val vs var", "Create data classes", "Work with lists and loops"]'::jsonb,
        '[]'::jsonb,
        25,
        11,
        'published'
    ),
    (
        v_m3,
        'Jetpack Compose basics',
        'jetpack-compose-basics',
        'Learn how composable functions, modifiers, columns, and rows work in Jetpack Compose.',
        '# Jetpack Compose basics

Compose replaces traditional XML layouts with declarative Kotlin functions.',
        '@Composable
fun NoteCard(title: String) {
    Card(modifier = Modifier.padding(8.dp)) {
        Text(text = title, modifier = Modifier.padding(16.dp))
    }
}',
        '["Create custom composable functions", "Apply padding and modifiers", "Arrange items with Column and Row"]'::jsonb,
        '[]'::jsonb,
        25,
        12,
        'published'
    ),
    (
        v_m3,
        'Build the home screen layout',
        'build-the-home-screen-layout',
        'Design the main dashboard screen displaying the list of saved notes and a floating action button.',
        '# Build the home screen layout

Combine LazyColumn, TopAppBar, and FloatingActionButton to create the NoteMate home screen.',
        '@Composable
fun HomeScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("NoteMate") }) },
        floatingActionButton = { FloatingActionButton(onClick = {}) { Icon(Icons.Default.Add, contentDescription = "Add") } }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding)) {
            // list items
        }
    }
}',
        '["Implement Scaffold layout", "Add LazyColumn for lists", "Add FloatingActionButton"]'::jsonb,
        '[]'::jsonb,
        30,
        13,
        'published'
    ),
    (
        v_m3,
        'Add navigation between screens',
        'add-navigation-between-screens',
        'Set up Jetpack Navigation Compose to route users between home and detail screens.',
        '# Add navigation between screens

Navigation Compose manages backstack and route parameters between composables.',
        'val navController = rememberNavController()
NavHost(navController = navController, startDestination = "home") {
    composable("home") { HomeScreen(onNavigateToDetail = { navController.navigate("detail") }) }
    composable("detail") { DetailScreen() }
}',
        '["Set up NavController", "Define NavHost routes", "Navigate between screens with parameters"]'::jsonb,
        '[]'::jsonb,
        25,
        14,
        'published'
    ),
    (
        v_m3,
        'Build the create-note screen',
        'build-the-create-note-screen',
        'Create input fields and save actions for drafting new notes.',
        '# Build the create-note screen

Use OutlinedTextField for capturing note titles and bodies.',
        '@Composable
fun CreateNoteScreen(onSave: (String, String) -> Unit) {
    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }
    // UI fields and save button
}',
        '["Add OutlinedTextField for title and body", "Manage text state with remember", "Implement save action callback"]'::jsonb,
        '[]'::jsonb,
        25,
        15,
        'published'
    ),

    -- Module 4: Lessons 16-20
    (
        v_m4,
        'Manage app state',
        'manage-app-state',
        'Understand state hoisting, ViewModels, and reactive UI updates in Jetpack Compose.',
        '# Manage app state

ViewModels survive configuration changes and hold your app data securely.',
        'class NoteViewModel : ViewModel() {
    var notes = mutableStateListOf<Note>()
        private set

    fun addNote(title: String, content: String) {
        notes.add(Note(notes.size + 1, title, content))
    }
}',
        '["Create ViewModel class", "Expose state list to UI", "Handle state mutations cleanly"]'::jsonb,
        '[]'::jsonb,
        25,
        16,
        'published'
    ),
    (
        v_m4,
        'Display a list of notes',
        'display-a-list-of-notes',
        'Render dynamic lists of notes efficiently using LazyColumn and items.',
        '# Display a list of notes

Bind your ViewModel note collection to LazyColumn items.',
        'LazyColumn {
    items(notes) { note ->
        NoteCard(note = note)
    }
}',
        '["Bind ViewModel state to LazyColumn", "Render custom note row cards", "Handle empty state messages"]'::jsonb,
        '[]'::jsonb,
        20,
        17,
        'published'
    ),
    (
        v_m4,
        'Save notes locally with Room',
        'save-notes-locally-with-room',
        'Implement Room database entities, DAOs, and database builders for persistent local storage.',
        '# Save notes locally with Room

Room provides an abstraction layer over SQLite for robust local database storage.',
        '@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val content: String
)',
        '["Create Room Entity", "Write Room DAO interfaces", "Build Room database instance"]'::jsonb,
        '[]'::jsonb,
        30,
        18,
        'published'
    ),
    (
        v_m4,
        'Add edit and delete functionality',
        'add-edit-and-delete-functionality',
        'Enable updating existing notes and deleting unwanted notes from the database.',
        '# Add edit and delete functionality

Extend your DAO with update and delete queries.',
        '@Query("DELETE FROM notes WHERE id = :noteId")
suspend fun deleteNote(noteId: Int)',
        '["Add update query in DAO", "Add delete query in DAO", "Connect UI swipe or button actions"]'::jsonb,
        '[]'::jsonb,
        25,
        19,
        'published'
    ),
    (
        v_m4,
        'Add search functionality',
        'add-search-functionality',
        'Implement real-time search filtering across note titles and content.',
        '# Add search functionality

Filter the note list reactively as the user types in the search bar.',
        '@Query("SELECT * FROM notes WHERE title LIKE :searchQuery")
fun searchNotes(searchQuery: String): Flow<List<NoteEntity>>',
        '["Add search input field", "Write SQL LIKE query in DAO", "Observe filtered flow in ViewModel"]'::jsonb,
        '[]'::jsonb,
        20,
        20,
        'published'
    ),

    -- Module 5: Lessons 21-25
    (
        v_m5,
        'Test normal user flows',
        'test-normal-user-flows',
        'Walk through complete end-to-end user journeys to catch bugs and friction points.',
        '# Test normal user flows

Manual testing checklist:
1. Open app from cold start.
2. Create a new note with special characters.
3. Edit the note title.
4. Search for the note keyword.
5. Delete the note and verify list updates.',
        '// Test scenario documentation',
        '["Test app cold start", "Verify create, edit, search, and delete flows", "Record bug list"]'::jsonb,
        '[]'::jsonb,
        15,
        21,
        'published'
    ),
    (
        v_m5,
        'Handle errors and edge cases',
        'handle-errors-and-edge-cases',
        'Ensure your app gracefully handles empty inputs, rotation, and unexpected interruptions.',
        '# Handle errors and edge cases

Prevent crashes when saving blank notes or rotating the screen during input.',
        'if (title.isBlank()) {
    showError = true
    return
}',
        '["Validate empty text inputs", "Test screen rotation state preservation", "Add user-friendly error messages"]'::jsonb,
        '[]'::jsonb,
        20,
        22,
        'published'
    ),
    (
        v_m5,
        'Improve UI, accessibility, and usability',
        'improve-ui-accessibility-usability',
        'Add content descriptions, correct contrast, and smooth touch feedback.',
        '# Improve UI, accessibility, and usability

Make your app accessible to all users by adding proper touch targets and screen-reader content descriptions.',
        'Modifier.clickable(onClick = onClick).semantics { contentDescription = "Delete note" }',
        '["Add content descriptions to icons", "Ensure minimum 48dp touch targets", "Review color contrast"]'::jsonb,
        '[]'::jsonb,
        20,
        23,
        'published'
    ),
    (
        v_m5,
        'Add an app icon and branding',
        'add-an-app-icon-and-branding',
        'Design a custom launcher icon and set your app color palette.',
        '# Add an app icon and branding

Use Android Studio Image Asset Studio to generate adaptive launcher icons.',
        '// Theme colors in Color.kt
val PrimaryBlue = Color(0xFF1E3A8A)
val AccentGreen = Color(0xFF10B981)',
        '["Generate adaptive launcher icon in Android Studio", "Define custom app color scheme", "Apply theme across screens"]'::jsonb,
        '[]'::jsonb,
        20,
        24,
        'published'
    ),
    (
        v_m5,
        'Write basic automated tests',
        'write-basic-automated-tests',
        'Write unit tests for your ViewModel and UI tests for your composables.',
        '# Write basic automated tests

Ensure business logic holds strong with JUnit tests.',
        '@Test
fun addition_isCorrect() {
    assertEquals(4, 2 + 2)
}',
        '["Set up JUnit dependency", "Write test for ViewModel note addition", "Run instrumented test in emulator"]'::jsonb,
        '[]'::jsonb,
        25,
        25,
        'published'
    ),

    -- Module 6: Lessons 26-30
    (
        v_m6,
        'Prepare your app for release',
        'prepare-your-app-for-release',
        'Configure ProGuard/R8 shrinking, version codes, and release configurations.',
        '# Prepare your app for release

Update your `build.gradle.kts` with release signing config and version codes.',
        'defaultConfig {
    versionCode = 1
    versionName = "1.0"
}',
        '["Update versionCode and versionName", "Enable R8 code shrinking", "Verify release build variant"]'::jsonb,
        '[]'::jsonb,
        20,
        26,
        'published'
    ),
    (
        v_m6,
        'Create a signed Android App Bundle',
        'create-a-signed-android-app-bundle',
        'Generate an `.aab` release bundle signed with your secure upload key.',
        '# Create a signed Android App Bundle

1. In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build Bundle(s)**.
2. Click **Create New Key**, store your keystore password securely, and build the release bundle.',
        '// Release bundle output: app/build/outputs/bundle/release/app-release.aab',
        '["Generate secure upload keystore", "Build signed Android App Bundle (.aab)", "Locate output bundle file"]'::jsonb,
        '[]'::jsonb,
        25,
        27,
        'published'
    ),
    (
        v_m6,
        'Create your Google Play developer account',
        'create-google-play-developer-account',
        'Register on the Google Play Console, pay the one-time developer fee, and verify your identity.',
        '# Create your Google Play developer account

1. Visit play.google.com/console.
2. Sign in with your Google account.
3. Pay the $25 USD registration fee and complete account verification.',
        '// Google Play Developer Console registration',
        '["Visit Google Play Console", "Complete developer registration and fee", "Verify account details"]'::jsonb,
        '[{"title": "Google Play Console", "url": "https://play.google.com/console"}]'::jsonb,
        15,
        28,
        'published'
    ),
    (
        v_m6,
        'Create your Play Store listing',
        'create-your-play-store-listing',
        'Write a compelling store description, upload feature graphics, screenshots, and privacy policy.',
        '# Create your Play Store listing

Prepare all required store assets:
- App Title and Short Description
- Full Description
- 512x512 App Icon
- 1024x500 Feature Graphic
- Phone and Tablet Screenshots',
        '// Store listing metadata',
        '["Draft store title and description", "Design app icon and feature graphic", "Add privacy policy URL"]'::jsonb,
        '[]'::jsonb,
        30,
        29,
        'published'
    ),
    (
        v_m6,
        'Publish to Google Play',
        'publish-to-google-play',
        'Upload your signed AAB to production or testing track and submit for Google review.',
        '# Publish to Google Play

1. Create a new release in the Play Console.
2. Upload your signed `app-release.aab`.
3. Complete content rating questionnaire and target audience declarations.
4. Click **Send for Review** to submit your app to Google.',
        '// Review submission completed',
        '["Upload signed .aab bundle", "Complete content rating questionnaire", "Submit app for Google review"]'::jsonb,
        '[{"title": "Play Console Publishing Guide", "url": "https://developer.android.com/distribute"}]'::jsonb,
        25,
        30,
        'published'
    );
END $$;
