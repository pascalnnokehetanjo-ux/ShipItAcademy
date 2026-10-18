-- 0010_quiz_certificate_rls.sql
-- Enable RLS and create secure policies for quizzes, questions, attempts, and certificates

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 1. Quizzes: Authenticated users can view quizzes in published courses
DROP POLICY IF EXISTS "Authenticated users can view published quizzes" ON public.quizzes;
CREATE POLICY "Authenticated users can view published quizzes"
ON public.quizzes
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM modules m
        JOIN courses c ON c.id = m.course_id
        WHERE m.id = module_id AND c.status = 'published'
    )
);

-- 2. Quiz Questions: Authenticated users can view questions for published course quizzes
-- Note: We hide correct_answer and explanation in client queries by selecting specific columns or using views/RPC.
DROP POLICY IF EXISTS "Authenticated users can view published quiz questions" ON public.quiz_questions;
CREATE POLICY "Authenticated users can view published quiz questions"
ON public.quiz_questions
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM quizzes q
        JOIN modules m ON m.id = q.module_id
        JOIN courses c ON c.id = m.course_id
        WHERE q.id = quiz_id AND c.status = 'published'
    )
);

-- 3. Quiz Attempts: Users can view and insert only their own attempts
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can view own quiz attempts"
ON public.quiz_attempts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can create own quiz attempts"
ON public.quiz_attempts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. Certificates: Users can view only their own certificates
DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;
CREATE POLICY "Users can view own certificates"
ON public.certificates
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
