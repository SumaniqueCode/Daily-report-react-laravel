export interface RegisterData {
  name: string;
  display_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface userResponseData {
  id: number;
  name: string;
  display_name: string;
  profile_picture: string | null;
  email: string;
  google_id: string;
  email_verified_at: string | null;
  workspace_id: number;
  created_at: string;
  updated_at: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface forgotData {
  email: string;
}

export interface tokenData {
  token: string;
  email: string;
}

export interface changePasswordData {
  email: string;
  password: string;
  password_confirmation: string;
}
