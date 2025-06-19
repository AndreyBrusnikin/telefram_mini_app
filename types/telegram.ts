export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebAppUser extends TelegramUser {
  allows_write_to_pm?: boolean;
}

export interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
  chat_instance?: string;
  chat_type?: string;
  auth_date: number;
  hash: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  displayName: string;
}

export interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 