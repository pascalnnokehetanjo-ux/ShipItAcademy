-- 0001_create_enums.sql
-- Create PostgreSQL enum types for ShipIt Academy

DO $$ BEGIN
    CREATE TYPE user_experience_level AS ENUM (
        'beginner',
        'some_coding',
        'developer_new_to_android'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE learning_goal AS ENUM (
        'build_first_app',
        'publish_google_play',
        'learn_android',
        'portfolio_project'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE feature_priority AS ENUM (
        'must_have',
        'should_have',
        'later'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM (
        'idea_defined',
        'tools_ready',
        'ui_in_progress',
        'logic_in_progress',
        'testing',
        'ready_for_play_store',
        'published'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_status AS ENUM (
        'draft',
        'published',
        'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
