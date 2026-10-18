export type FeaturePriority = 'must_have' | 'should_have' | 'later';

export type ProjectStatus =
  | 'idea_defined'
  | 'tools_ready'
  | 'ui_in_progress'
  | 'logic_in_progress'
  | 'testing'
  | 'ready_for_play_store'
  | 'published';

export type ReleaseChecklistKey =
  | 'app_icon_ready'
  | 'screenshots_ready'
  | 'privacy_policy_ready'
  | 'data_safety_form_completed'
  | 'signed_aab_created'
  | 'internal_testing_completed'
  | 'store_listing_completed'
  | 'app_submitted_for_review';

export type ReleaseChecklistState = Record<ReleaseChecklistKey, boolean>;

export type CreateProjectInput = {
  appName: string;
  oneLinePurpose: string;
  targetUser: string;
  problemSolved: string;
  appCategory: string;
  needsLogin: boolean;
};

export type UpdateProjectInput = CreateProjectInput;

export type AddFeatureInput = {
  title: string;
  description: string;
  priority: FeaturePriority;
};

export type AddScreenInput = {
  name: string;
  purpose: string;
  notes: string;
};
