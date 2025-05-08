
export type UserRole = 'cer_manager' | 'user' | 'producer' | 'consumer' | 'prosumer';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

export interface LogoutResult {
  success: boolean;
  error?: string;
}
