export interface AddTeamData {
  user_role_id: number;
  email: string;
}

export interface EditTeamData {
  id: number;
  user_role_id: number;
}

export interface TeamData {
  id: number;
  user_role_id: number,
  status: string,
  created_at: string,
  updated_at: string,
  user: UserProps,
}
export interface UserProps {
  id: number;
  name: string | null;
  display_name: string;
  profile_picture: string | null;
  email: string;
  google_id: string | null;
  email_verified_at: string | null;
  workspace_id: number | null;
  created_at: string;
  updated_at: string;
}

