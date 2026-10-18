import { createClient } from '@/lib/supabase/server';
import { Quiz, QuizQuestion, QuizAttempt, Module, Course } from '@/types/database';

export interface PublicQuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: string;
  options: any[];
  order_index: number;
}

export interface QuizPageData {
  quiz: Quiz;
  questions: PublicQuizQuestion[];
  latestAttempt: QuizAttempt | null;
  bestAttempt: QuizAttempt | null;
  hasPassed: boolean;
  module: Module;
  course: Course;
}

export async function getQuizForModule(userId: string, moduleId: string): Promise<QuizPageData | null> {
  const supabase = await createClient();

  // 1. Fetch quiz for module
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('module_id', moduleId)
    .single();

  if (!quiz) return null;

  // 2. Fetch module and course
  const { data: module } = await supabase
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .single();

  if (!module) return null;

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', module.course_id)
    .eq('status', 'published')
    .single();

  if (!course) return null;

  // 3. Fetch questions WITHOUT correct_answer and explanation
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, quiz_id, question_text, question_type, options, order_index')
    .eq('quiz_id', quiz.id)
    .order('order_index', { ascending: true });

  // 4. Fetch user attempts for this quiz
  const { data: attempts } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .eq('quiz_id', quiz.id)
    .order('created_at', { ascending: false });

  const userAttempts: QuizAttempt[] = attempts || [];
  const latestAttempt = userAttempts.length > 0 ? userAttempts[0] : null;
  const bestAttempt = userAttempts.reduce((best, curr) => (curr.score > (best?.score || 0) ? curr : best), userAttempts[0] || null);
  const hasPassed = userAttempts.some((a) => a.passed);

  return {
    quiz,
    questions: questions || [],
    latestAttempt,
    bestAttempt,
    hasPassed,
    module,
    course,
  };
}

export async function submitQuizAttempt(userId: string, quizId: string, answers: Record<string, string>) {
  const supabase = await createClient();

  // 1. Fetch quiz
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*, modules!inner(course_id, courses!inner(status))')
    .eq('id', quizId)
    .single();

  if (!quiz || (quiz.modules as any).courses.status !== 'published') {
    throw new Error('Quiz not found or course not published');
  }

  // 2. Fetch all questions with correct answers and explanations
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizId)
    .order('order_index', { ascending: true });

  if (!questions || questions.length === 0) {
    throw new Error('Quiz questions not found');
  }

  // 3. Calculate score server-side
  let correctCount = 0;
  const totalQuestions = questions.length;
  const reviewDetails: Record<string, { userAnswer: string; correctAnswer: string; isCorrect: boolean; explanation: string | null }> = {};

  questions.forEach((q) => {
    const userAns = answers[q.id] || '';
    const isCorrect = userAns.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
    if (isCorrect) correctCount++;

    reviewDetails[q.id] = {
      userAnswer: userAns,
      correctAnswer: q.correct_answer,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= quiz.passing_score;

  // 4. Insert attempt
  const { data: attempt, error } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      score,
      passed,
      answers,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    attemptId: attempt.id,
    score,
    passed,
    passingScore: quiz.passing_score,
    review: reviewDetails,
  };
}

export async function getQuizResult(userId: string, attemptId: string) {
  const supabase = await createClient();

  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*, quizzes(*)')
    .eq('id', attemptId)
    .eq('user_id', userId)
    .single();

  if (!attempt) return null;

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', attempt.quiz_id)
    .order('order_index', { ascending: true });

  return {
    attempt,
    questions: questions || [],
    quiz: attempt.quizzes,
  };
}
