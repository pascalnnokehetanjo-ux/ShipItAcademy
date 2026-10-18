-- 0011_seed_quizzes.sql
-- Seed 6 quizzes (one per module) with 5 questions each (30 questions total)

DO $$
DECLARE
    v_m1 uuid;
    v_m2 uuid;
    v_m3 uuid;
    v_m4 uuid;
    v_m5 uuid;
    v_m6 uuid;
    v_q1 uuid;
    v_q2 uuid;
    v_q3 uuid;
    v_q4 uuid;
    v_q5 uuid;
    v_q6 uuid;
BEGIN
    -- Fetch module IDs
    SELECT id INTO v_m1 FROM modules WHERE order_index = 1 LIMIT 1;
    SELECT id INTO v_m2 FROM modules WHERE order_index = 2 LIMIT 1;
    SELECT id INTO v_m3 FROM modules WHERE order_index = 3 LIMIT 1;
    SELECT id INTO v_m4 FROM modules WHERE order_index = 4 LIMIT 1;
    SELECT id INTO v_m5 FROM modules WHERE order_index = 5 LIMIT 1;
    SELECT id INTO v_m6 FROM modules WHERE order_index = 6 LIMIT 1;

    IF v_m1 IS NULL THEN RETURN; END IF;

    -- Quiz 1: Prepare Your App Idea
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m1, 'Prepare Your App Idea Quiz', 'Test your knowledge on app scoping, problem definition, and MVP planning.', 70, 1)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q1;

    IF v_q1 IS NULL THEN
        SELECT id INTO v_q1 FROM quizzes WHERE module_id = v_m1 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q1,
        'What is the primary goal of an MVP (Minimum Viable Product) for your first app?',
        '["To build every possible feature at once", "To test the core app concept with real users with minimal complexity", "To secure millions in venture capital before writing code", "To design complex 3D graphics"]'::jsonb,
        'To test the core app concept with real users with minimal complexity',
        'An MVP focuses on solving one core problem efficiently without over-engineering.',
        1
    ),
    (
        v_q1,
        'Why is it recommended to keep your first Android app scope small?',
        '["To finish quickly and build confidence through a successful launch", "Because Android does not support large apps", "Because Google Play rejects apps with more than one screen", "To avoid writing any Kotlin code"]'::jsonb,
        'To finish quickly and build confidence through a successful launch',
        'Starting small prevents beginner burnout and guarantees you experience the full release lifecycle.',
        2
    ),
    (
        v_q1,
        'What constitutes the User Interface (UI) in a mobile app?',
        '["The background database tables", "What the user sees and touches on the screen", "The server-side hosting provider", "The app build configuration files"]'::jsonb,
        'What the user sees and touches on the screen',
        'The UI encompasses buttons, text fields, lists, and screens visible to the user.',
        3
    ),
    (
        v_q1,
        'Which of the following is a good example of a focused first app idea?',
        '["A global multi-vendor e-commerce marketplace", "A simple offline note-taking app", "A real-time 3D multiplayer racing game", "An enterprise social network"]'::jsonb,
        'A simple offline note-taking app',
        'A note-taking app covers essential CRUD operations without requiring complex server synchronization.',
        4
    ),
    (
        v_q1,
        'What is the purpose of defining your target user before coding?',
        '["To make wireframing harder", "To understand who experiences the pain point you are solving", "To comply with legal tax laws", "To determine your app icon color"]'::jsonb,
        'To understand who experiences the pain point you are solving',
        'Knowing your target user ensures your features solve a real, specific need.',
        5
    )
    ON CONFLICT DO NOTHING;

    -- Quiz 2: Set Up Your Development Environment
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m2, 'Development Environment Quiz', 'Test your understanding of Android Studio, emulators, and Git version control.', 70, 2)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q2;

    IF v_q2 IS NULL THEN
        SELECT id INTO v_q2 FROM quizzes WHERE module_id = v_m2 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q2,
        'What is the official Integrated Development Environment (IDE) for Android app development?',
        '["Xcode", "Android Studio", "Visual Studio Code", "Eclipse"]'::jsonb,
        'Android Studio',
        'Android Studio is Google''s official IDE built specifically for Android app engineering.',
        1
    ),
    (
        v_q2,
        'How do you enable USB debugging on a physical Android device?',
        '["Tap Build Number 7 times in About Phone, then enable USB Debugging in Developer Options", "Plug the phone into a charger for 10 hours", "Send an email to Google support", "Download a third-party root app"]'::jsonb,
        'Tap Build Number 7 times in About Phone, then enable USB Debugging in Developer Options',
        'Developer options are hidden by default and unlocked by tapping the build number repeatedly.',
        2
    ),
    (
        v_q2,
        'What is the purpose of a .gitignore file in Git version control?',
        '["To delete your entire project when you push", "To specify files and directories that Git should ignore and not track", "To store your database password publicly", "To automatically publish your app to Google Play"]'::jsonb,
        'To specify files and directories that Git should ignore and not track',
        'A .gitignore file prevents build caches, IDE configs, and sensitive local files from being committed.',
        3
    ),
    (
        v_q2,
        'What is an Android Virtual Device (AVD)?',
        '["A physical phone sold by Google", "A software emulator that simulates an Android device on your computer", "A cloud server running Linux", "A backup power supply"]'::jsonb,
        'A software emulator that simulates an Android device on your computer',
        'AVD allows testing apps across various screen sizes and Android API versions without needing physical hardware.',
        4
    ),
    (
        v_q2,
        'Which command initializes a new Git repository in your project directory?',
        '["git start", "git init", "git new", "git create"]'::jsonb,
        'git init',
        'git init creates a new local Git repository in the current folder.',
        5
    )
    ON CONFLICT DO NOTHING;

    -- Quiz 3: Build the App Interface
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m3, 'App Interface Quiz', 'Test your knowledge on Kotlin syntax and Jetpack Compose layouts.', 70, 3)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q3;

    IF v_q3 IS NULL THEN
        SELECT id INTO v_q3 FROM quizzes WHERE module_id = v_m3 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q3,
        'What is Jetpack Compose?',
        '["Android’s modern declarative UI toolkit for building native user interfaces", "An audio mixing library", "A database query language", "A server hosting protocol"]'::jsonb,
        'Android’s modern declarative UI toolkit for building native user interfaces',
        'Jetpack Compose allows building native screens with less code using reactive Kotlin functions.',
        1
    ),
    (
        v_q3,
        'In Kotlin, what is the difference between val and var?',
        '["val is read-only (immutable), while var is mutable", "val is for integers, var is for strings", "val runs on servers, var runs on devices", "There is no difference"]'::jsonb,
        'val is read-only (immutable), while var is mutable',
        'Using val promotes immutability, making code safer and easier to reason about.',
        2
    ),
    (
        v_q3,
        'Which composable layout element arranges items vertically in Jetpack Compose?',
        '["Row", "Column", "Box", "Grid"]'::jsonb,
        'Column',
        'Column places items sequentially in a vertical stack.',
        3
    ),
    (
        v_q3,
        'What does a FloatingActionButton (FAB) typically represent in an app UI?',
        '["A background system error", "The primary primary action on the screen, such as creating a new item", "A banner advertisement", "A logout button"]'::jsonb,
        'The primary primary action on the screen, such as creating a new item',
        'FABs highlight the most common or important action, like adding a new note.',
        4
    ),
    (
        v_q3,
        'How do you manage navigation between screens in modern Jetpack Compose apps?',
        '["Using Navigation Compose with NavHost and NavController", "Using HTML anchor tags", "Writing custom C++ socket code", "Sending SMS messages"]'::jsonb,
        'Using Navigation Compose with NavHost and NavController',
        'Navigation Compose provides type-safe and declarative routing between composable screens.',
        5
    )
    ON CONFLICT DO NOTHING;

    -- Quiz 4: Add Logic and Data
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m4, 'Logic and Data Quiz', 'Test your knowledge on ViewModels, state management, and Room local database.', 70, 4)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q4;

    IF v_q4 IS NULL THEN
        SELECT id INTO v_q4 FROM quizzes WHERE module_id = v_m4 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q4,
        'What is the primary purpose of a ViewModel in Android architecture?',
        '["To store user passwords in plain text", "To store and manage UI-related data conscious of lifecycle changes like screen rotation", "To render 3D game physics", "To replace the Kotlin programming language"]'::jsonb,
        'To store and manage UI-related data conscious of lifecycle changes like screen rotation',
        'ViewModels survive configuration changes so data is not lost when the device rotates.',
        1
    ),
    (
        v_q4,
        'What is Room in Android development?',
        '["A physical hotel booking system", "A persistence library providing an abstraction layer over SQLite for local database storage", "A UI padding modifier", "An emulator skin"]'::jsonb,
        'A persistence library providing an abstraction layer over SQLite for local database storage',
        'Room makes it easy to store structured app data locally on the device using type-safe SQL queries.',
        2
    ),
    (
        v_q4,
        'What does a LazyColumn do in Jetpack Compose?',
        '["Renders all items at once regardless of screen size", "Renders only visible items on screen efficiently, ideal for long lists", "Freezes the app until clicked", "Automatically deletes old data"]'::jsonb,
        'Renders only visible items on screen efficiently, ideal for long lists',
        'LazyColumn recycles views and only composes visible items, ensuring high performance for lists.',
        3
    ),
    (
        v_q4,
        'Why do we use State in Jetpack Compose?',
        '["To notify the UI when data changes so it can recompose automatically", "To encrypt user data", "To connect to Wi-Fi", "To format currency symbols"]'::jsonb,
        'To notify the UI when data changes so it can recompose automatically',
        'Declarative UI frameworks re-render or recompose when observed state variables change.',
        4
    ),
    (
        v_q4,
        'What annotation marks a class as a database table in Room?',
        '["@Table", "@Entity", "@DatabaseTable", "@Model"]'::jsonb,
        '@Entity',
        '@Entity tells Room that the data class represents a database table.',
        5
    )
    ON CONFLICT DO NOTHING;

    -- Quiz 5: Test and Improve
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m5, 'Test and Improve Quiz', 'Test your knowledge on debugging, accessibility, UI polish, and unit testing.', 70, 5)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q5;

    IF v_q5 IS NULL THEN
        SELECT id INTO v_q5 FROM quizzes WHERE module_id = v_m5 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q5,
        'Why is accessibility (a11y) important in Android apps?',
        '["It is only required for government apps", "It ensures users with visual, auditory, or physical disabilities can successfully use your app", "It makes the app file size smaller", "It compiles faster"]'::jsonb,
        'It ensures users with visual, auditory, or physical disabilities can successfully use your app',
        'Adding content descriptions and proper touch targets makes your app inclusive for all users.',
        1
    ),
    (
        v_q5,
        'What is the recommended minimum touch target size for interactive elements on Android?',
        '["12dp by 12dp", "24dp by 24dp", "48dp by 48dp", "100dp by 100dp"]'::jsonb,
        '48dp by 48dp',
        'Google Material Design recommends at least 48x48dp for touch targets to prevent accidental taps.',
        2
    ),
    (
        v_q5,
        'What is the purpose of ProGuard / R8 code shrinking?',
        '["To encrypt your source code so humans cannot read it", "To shrink app size and remove unused code and metadata during release builds", "To slow down app execution", "To add watermark images to UI screens"]'::jsonb,
        'To shrink app size and remove unused code and metadata during release builds',
        'R8 optimization removes dead code and obfuscates classes to reduce APK/AAB bundle size.',
        3
    ),
    (
        v_q5,
        'What is an instrumented test in Android?',
        '["A test that plays musical notes", "A test that runs on a physical device or emulator and tests UI and database interactions", "A test that runs exclusively on your local development CPU without Android framework", "A manual code review"]'::jsonb,
        'A test that runs on a physical device or emulator and tests UI and database interactions',
        'Instrumented tests require an Android environment (device/emulator) to verify component interactions.',
        4
    ),
    (
        v_q5,
        'How should you handle unexpected empty states in your UI?',
        '["Crash the app immediately", "Display a friendly empty state message with a call to action", "Hide the screen entirely", "Display random gibberish text"]'::jsonb,
        'Display a friendly empty state message with a call to action',
        'Friendly empty states guide users on what to do when no data is present yet.',
        5
    )
    ON CONFLICT DO NOTHING;

    -- Quiz 6: Deploy and Publish
    INSERT INTO quizzes (module_id, title, description, passing_score, order_index)
    VALUES (v_m6, 'Deploy and Publish Quiz', 'Test your knowledge on Google Play Console, AAB bundles, and store listings.', 70, 6)
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_q6;

    IF v_q6 IS NULL THEN
        SELECT id INTO v_q6 FROM quizzes WHERE module_id = v_m6 LIMIT 1;
    END IF;

    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, explanation, order_index)
    VALUES 
    (
        v_q6,
        'What file format does Google Play require for new Android app releases?',
        '["APK only", "AAB (Android App Bundle)", "EXE", "ZIP"]'::jsonb,
        'AAB (Android App Bundle)',
        'Google Play uses the Android App Bundle (AAB) format to generate optimized APKs for each device configuration.',
        1
    ),
    (
        v_q6,
        'Where do you upload your signed release bundle and manage store listings?',
        '["Google Play Console", "GitHub Releases", "Firebase Hosting", "Google Drive"]'::jsonb,
        'Google Play Console',
        'The Google Play Console (play.google.com/console) is the official dashboard for publishing and managing apps.',
        2
    ),
    (
        v_q6,
        'What is the purpose of an upload keystore?',
        '["To store your login password for Google Workspace", "To cryptographically sign your app release bundle so Google can verify your identity", "To speed up emulator boot times", "To back up database files"]'::jsonb,
        'To cryptographically sign your app release bundle so Google can verify your identity',
        'Keystores ensure that updates to your app come from you and prevent tampering.',
        3
    ),
    (
        v_q6,
        'Why should you conduct internal testing before releasing your app publicly?',
        '["To test the app with real users and catch critical bugs before public launch", "To increase the app purchase price", "To comply with tax laws in Antarctica", "It is optional and has no benefit"]'::jsonb,
        'To test the app with real users and catch critical bugs before public launch',
        'Internal testing tracks allow catching device-specific crashes early in a controlled group.',
        4
    ),
    (
        v_q6,
        'What asset is required for every app on Google Play to explain how user data is handled?',
        '["Privacy Policy and Data Safety form", "A 10-minute video documentary", "A signed physical contract", "An invoice"]'::jsonb,
        'Privacy Policy and Data Safety form',
        'Google Play mandates a clear Privacy Policy URL and accurate Data Safety questionnaire responses.',
        5
    )
    ON CONFLICT DO NOTHING;
END $$;
