-- 0009_create_certificates_system.sql
-- Create certificates table and automatic certificate issuance function & trigger

CREATE TABLE IF NOT EXISTS certificates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    certificate_code text NOT NULL UNIQUE,
    issued_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates(course_id);

-- Function to check eligibility and issue certificate
CREATE OR REPLACE FUNCTION public.issue_certificate_if_eligible(p_user_id uuid, p_course_id uuid)
RETURNS public.certificates
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_total_lessons integer;
    v_completed_lessons integer;
    v_total_quizzes integer;
    v_passed_quizzes integer;
    v_cert_code text;
    v_cert public.certificates;
BEGIN
    -- 1. Check user exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
        RETURN NULL;
    END IF;

    -- 2. Check course is published
    IF NOT EXISTS (SELECT 1 FROM courses WHERE id = p_course_id AND status = 'published') THEN
        RETURN NULL;
    END IF;

    -- 3. Count total published lessons in course
    SELECT count(l.id) INTO v_total_lessons
    FROM lessons l
    JOIN modules m ON m.id = l.module_id
    WHERE m.course_id = p_course_id AND l.status = 'published';

    -- 4. Count completed lessons for user in course
    SELECT count(lp.id) INTO v_completed_lessons
    FROM lesson_progress lp
    JOIN lessons l ON l.id = lp.lesson_id
    JOIN modules m ON m.id = l.module_id
    WHERE lp.user_id = p_user_id
      AND m.course_id = p_course_id
      AND lp.completed = true
      AND l.status = 'published';

    -- 5. Count total quizzes for course
    SELECT count(q.id) INTO v_total_quizzes
    FROM quizzes q
    JOIN modules m ON m.id = q.module_id
    WHERE m.course_id = p_course_id;

    -- 6. Count distinct quizzes passed by user for this course
    SELECT count(DISTINCT qa.quiz_id) INTO v_passed_quizzes
    FROM quiz_attempts qa
    JOIN quizzes q ON q.id = qa.quiz_id
    JOIN modules m ON m.id = q.module_id
    WHERE qa.user_id = p_user_id
      AND m.course_id = p_course_id
      AND qa.passed = true;

    -- 7. Check if eligible (all lessons complete AND all quizzes passed)
    IF v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons AND v_total_quizzes > 0 AND v_passed_quizzes >= v_total_quizzes THEN
        -- Generate unique certificate code: SHIPIT-YYYY-XXXXXXXX
        v_cert_code := 'SHIPIT-' || to_char(now(), 'YYYY') || '-' || upper(substr(md5(random()::text), 1, 8));

        INSERT INTO certificates (user_id, course_id, certificate_code)
        VALUES (p_user_id, p_course_id, v_cert_code)
        ON CONFLICT (user_id, course_id) DO NOTHING
        RETURNING * INTO v_cert;

        RETURN v_cert;
    END IF;

    RETURN NULL;
END;
$$;

-- Trigger function on quiz_attempts
CREATE OR REPLACE FUNCTION public.check_certificate_after_quiz_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_course_id uuid;
BEGIN
    -- Find course_id for the quiz attempted
    SELECT m.course_id INTO v_course_id
    FROM quizzes q
    JOIN modules m ON m.id = q.module_id
    WHERE q.id = NEW.quiz_id;

    IF v_course_id IS NOT NULL AND NEW.passed = true THEN
        PERFORM public.issue_certificate_if_eligible(NEW.user_id, v_course_id);
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_certificate_after_quiz_attempt ON quiz_attempts;
CREATE TRIGGER trg_check_certificate_after_quiz_attempt
AFTER INSERT ON quiz_attempts
FOR EACH ROW
EXECUTE FUNCTION public.check_certificate_after_quiz_attempt();
