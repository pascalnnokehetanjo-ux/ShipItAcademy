-- rls_security_tests.sql
-- Manual RLS Security Test Queries for Supabase SQL Editor
--
-- INSTRUCTIONS FOR MANUAL TESTING:
-- 1. Create two test users in Supabase Auth (e.g. User A and User B).
-- 2. In the Supabase SQL Editor, use set role or authenticated user session tokens to execute the tests below.
-- 3. Verify that all security assertions pass successfully.

/*
============================================================
TEST CASE 1: Anonymous Access Restrictions
============================================================

-- 1. Anonymous user cannot select profiles (should return 0 rows)
SET ROLE anon;
SELECT * FROM public.profiles;

-- 2. Anonymous user cannot select lesson_progress (should return 0 rows)
SELECT * FROM public.lesson_progress;

-- 3. Anonymous user cannot select projects (should return 0 rows)
SELECT * FROM public.projects;

RESET ROLE;
*/


/*
============================================================
TEST CASE 2: Authenticated User Isolation & Ownership
============================================================

-- Assume User A has uuid '11111111-1111-1111-1111-111111111111'
-- and User B has uuid '22222222-2222-2222-2222-222222222222'.

-- 4. An authenticated user can select their own profile
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
SELECT * FROM public.profiles WHERE id = '11111111-1111-1111-1111-111111111111'; -- Should return User A profile

-- 5. An authenticated user cannot select another user''s profile
SELECT * FROM public.profiles WHERE id = '22222222-2222-2222-2222-222222222222'; -- Should return 0 rows

-- 6. An authenticated user can select published courses
SELECT * FROM public.courses WHERE status = 'published'; -- Should return published courses

-- 7. An authenticated user can select lessons in published courses
SELECT * FROM public.lessons; -- Should return all 30 published lessons

-- 8. An authenticated user cannot update a course (should fail / return 0 rows affected)
UPDATE public.courses SET title = 'Hacked Course' WHERE slug = 'build-publish-first-android-app';

-- 9. An authenticated user cannot update a lesson (should fail / return 0 rows affected)
UPDATE public.lessons SET title = 'Hacked Lesson' WHERE order_index = 1;

-- 10. An authenticated user can insert their own lesson_progress
INSERT INTO public.lesson_progress (user_id, lesson_id, completed)
SELECT '11111111-1111-1111-1111-111111111111', id, true 
FROM public.lessons LIMIT 1; -- Should succeed

-- 11. An authenticated user cannot insert lesson_progress for another user (should fail RLS check)
INSERT INTO public.lesson_progress (user_id, lesson_id, completed)
SELECT '22222222-2222-2222-2222-222222222222', id, true 
FROM public.lessons LIMIT 1; -- Should raise RLS violation

-- 12. An authenticated user can update their own lesson_progress
UPDATE public.lesson_progress 
SET completed = false 
WHERE user_id = '11111111-1111-1111-1111-111111111111'; -- Should succeed

-- 13. An authenticated user cannot update another user''s lesson_progress (should affect 0 rows)
UPDATE public.lesson_progress 
SET completed = true 
WHERE user_id = '22222222-2222-2222-2222-222222222222';

-- 14. An authenticated user can create their own project
INSERT INTO public.projects (user_id, app_name, one_line_purpose)
VALUES ('11111111-1111-1111-1111-111111111111', 'NoteMate', 'Fast offline note app'); -- Should succeed

-- 15. An authenticated user cannot create a project for another user (should fail RLS check)
INSERT INTO public.projects (user_id, app_name, one_line_purpose)
VALUES ('22222222-2222-2222-2222-222222222222', 'FakeProject', 'Hacked'); -- Should fail

-- 16. An authenticated user can add a feature only to their own project
INSERT INTO public.project_features (project_id, title)
SELECT id, 'Dark Mode' FROM public.projects WHERE user_id = '11111111-1111-1111-1111-111111111111' LIMIT 1; -- Should succeed

-- 17. An authenticated user cannot add a feature to another user''s project (should fail RLS check)
INSERT INTO public.project_features (project_id, title)
SELECT id, 'Malicious Feature' FROM public.projects WHERE user_id = '22222222-2222-2222-2222-222222222222' LIMIT 1; -- Should fail

-- 18. An authenticated user can select only their own certificates
SELECT * FROM public.certificates; -- Returns only certificates where user_id = '11111111-1111-1111-1111-111111111111'

-- 19. An authenticated user cannot insert a certificate directly (should fail RLS check)
INSERT INTO public.certificates (user_id, course_id, certificate_code)
SELECT '11111111-1111-1111-1111-111111111111', id, 'CERT-FAKE-123' FROM public.courses LIMIT 1; -- Should fail

RESET ROLE;
*/
