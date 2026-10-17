-- 0007_enable_rls_and_policies.sql
-- Enable Row Level Security (RLS) and create secure ownership-based policies for all tables

-- ==========================================
-- STEP 1: ENABLE ROW LEVEL SECURITY
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;


-- ==========================================
-- STEP 2: PROFILES POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- ==========================================
-- STEP 3: COURSE CONTENT POLICIES (Courses, Modules, Lessons)
-- ==========================================

DROP POLICY IF EXISTS "Authenticated users can view published courses" ON public.courses;
CREATE POLICY "Authenticated users can view published courses"
ON public.courses
FOR SELECT
TO authenticated
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can view modules in published courses" ON public.modules;
CREATE POLICY "Authenticated users can view modules in published courses"
ON public.modules
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.courses c
    where c.id = course_id
      AND c.status = 'published'
  )
);

DROP POLICY IF EXISTS "Authenticated users can view lessons in published courses" ON public.lessons;
CREATE POLICY "Authenticated users can view lessons in published courses"
ON public.lessons
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE m.id = lesson.module_id
      AND c.status = 'published'
  )
);


-- ==========================================
-- STEP 4: LESSON PROGRESS POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can view own lesson progress"
ON public.lesson_progress
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can create own lesson progress"
ON public.lesson_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can update own lesson progress"
ON public.lesson_progress
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can delete own lesson progress"
ON public.lesson_progress
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ==========================================
-- STEP 5: PROJECT POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own project" ON public.projects;
CREATE POLICY "Users can view own project"
ON public.projects
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own project" ON public.projects;
CREATE POLICY "Users can create own project"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own project" ON public.projects;
CREATE POLICY "Users can update own project"
ON public.projects
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own project" ON public.projects;
CREATE POLICY "Users can delete own project"
ON public.projects
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ==========================================
-- STEP 6: PROJECT FEATURES POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own project features" ON public.project_features;
CREATE POLICY "Users can view own project features"
ON public.project_features
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can create own project features" ON public.project_features;
CREATE POLICY "Users can create own project features"
ON public.project_features
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can update own project features" ON public.project_features;
CREATE POLICY "Users can update own project features"
ON public.project_features
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can delete own project features" ON public.project_features;
CREATE POLICY "Users can delete own project features"
ON public.project_features
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);


-- ==========================================
-- STEP 7: PROJECT SCREENS POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own project screens" ON public.project_screens;
CREATE POLICY "Users can view own project screens"
ON public.project_screens
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can create own project screens" ON public.project_screens;
CREATE POLICY "Users can create own project screens"
ON public.project_screens
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can update own project screens" ON public.project_screens;
CREATE POLICY "Users can update own project screens"
ON public.project_screens
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can delete own project screens" ON public.project_screens;
CREATE POLICY "Users can delete own project screens"
ON public.project_screens
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_id
      AND p.user_id = auth.uid()
  )
);


-- ==========================================
-- STEP 8: CERTIFICATE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;
CREATE POLICY "Users can view own certificates"
ON public.certificates
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


-- ==========================================
-- STEP 10: SECURITY AUDIT QUERY
-- ==========================================
-- Run this query to verify RLS status and policy counts for all public tables:
--
-- SELECT 
--     t.tablename AS table_name,
--     t.rowsecurity AS row_security_active,
--     COUNT(p.policyname) AS policy_count
-- FROM pg_tables t
-- LEFT JOIN pg_policies p ON p.tablename = t.tablename AND p.schemaname = t.schemaname
-- WHERE t.schemaname = 'public'
-- GROUP BY t.tablename, t.rowsecurity
-- ORDER BY t.tablename;
