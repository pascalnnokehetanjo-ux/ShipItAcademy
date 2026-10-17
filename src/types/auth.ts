export type AuthErrorState = {
  message: string;
} | null;

export type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type UpdatePasswordFormData = {
  password: string;
  confirmPassword: string;
};
