// this one is response from backend
export interface AssignedTeam {
  created_at: string;
  display_name: string;
  email: string;
  email_verified_at: string | null;
  google_id: string;
  id: number;
  name: string;
  profile_picture: string | null;
  updated_at: string;
  workspace_id: number;
}

// response from backend
export interface ProjectData {
  assigned_team: AssignedTeam[];
  created_at: string;
  description: string;
  id: number;
  name: string;
  priority: number;
  slug: string;
  status: number;
  updated_at: string;
  workspace_id: number;
}

export interface addProjectData {
  name: string;
  description: string;
  status: number;
  priority: number;
  assigned_team: number[];
}

export interface editProjectData {
  name: string;
  description: string;
  status: number;
  priority: number;
  assigned_team: number[];
  id: number;
}

// ProjectModule starts

// send this from client
export interface addModuleData {
  name: string;
  description: string;
  status: number;
  start_date: string;
  end_date: string;
  project_id: string;
  assigned_team: number[];
  lead: number[];
}

export interface moduleTeams {
  display_name: string;
  email: string;
  id: number;
  name: string | null;
  profile_picture: string | null;
}

export interface getModuleData {
  assigned_team: moduleTeams[];
  description: string;
  end_date: string | null;
  id: number;
  lead: moduleTeams[];
  name: string;
  start_date: string | null;
  status: number;
  project_id: number;
  updated_at: string;
}
export interface editModuleData {
  id: number;
  name: string;
  description: string;
  status: number;
  start_date: string | null;
  end_date: string | null;
  project_id: number;
  assigned_team: number[];
  lead: number[];
}
