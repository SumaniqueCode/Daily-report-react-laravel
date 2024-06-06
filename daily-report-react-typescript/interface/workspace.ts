export interface WorkspaceData {
    id:number;
    name:string;
    description:string;
    size:string;
    logo:string | "";
    created_at:string;
}

export interface EditWorkspaceData{
    onSuccess : () =>void;
    myWorkspace: WorkspaceData;
}