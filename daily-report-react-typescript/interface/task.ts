//task interface

export interface TaskTeamData {
    display_name: string,
    email: string,
    id: number,
    name: string | null,
    profile_picture: string | null,
}

export interface AddTaskData {
    module_id: number | null,
    project_id: number,
    name: string,
    description: string,
    start_date: string,
    due_date: string,
    status: number,
    priority: number,
    assigned_team: number[],
}

export interface TaskData {
    id: number,
    module_id: number,
    project_id: number,
    name: string,
    description: string | null,
    start_date: string | null,
    due_date: string | null,
    status: number,
    priority: number,
    assigned_team: TaskTeamData[],
    updated_at: string,
    created_at: string,
}

export interface EditTaskData {
    id: number,
    name: string,
    description: string | null,
    start_date: string | null,
    due_date: string | null,
    status: number,
    priority: number,
    assigned_team: number[],
}