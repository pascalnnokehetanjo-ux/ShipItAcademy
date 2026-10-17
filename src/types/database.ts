export type ExperienceLevel = 'beginner' | 'some_coding' | 'developer_new_to_android';
export type LearningGoal = 'build_first_app' | 'publish_google_play' | 'learn_android' | 'portfolio_project';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ProjectStatus = 'idea_defined' | 'tools_ready' | 'ui_in_progress' | 'logic_in_progress' | 'testing' | 'ready_for_play_store' | 'published';
export type FeaturePriority = 'must_have' | 'should_have' | 'later';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  experience_level: ExperienceLevel | null;
  learning_goal: LearningGoal | null;
  weekly_hours: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  is_free: boolean;
  status: ContentStatus;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  summary: string | null;
  content_md: string;
  code_snippet: string | null;
  checklist: any[];
  resources: any[];
  estimated_minutes: number;
  order_index: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  checklist_state: Record<string, boolean>;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  app_name: string;
  one_line_purpose: string | null;
  target_user: string | null;
  problem_solved: string | null;
  app_category: string | null;
  needs_login: boolean;
  status: ProjectStatus;
  release_checklist: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface ProjectFeature {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  priority: FeaturePriority;
  completed: boolean;
  order_index: number;
  created_at: string;
}

export interface ProjectScreen {
  id: string;
  project_id: string;
  name: string;
  purpose: string | null;
  notes: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  issued_at: string;
}
