<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    //for adding to new project to workspace
    public function addProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $assignedTeam = Json::encode($request->assigned_team);
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'workspace_id' => auth()->user()->workspace_id,
            'assigned_team' => $assignedTeam,
        ]);
        return response()->json(['message' => "Project Added Successfully", 'project' => $project], 201);
    }

    //for getting the specific project data
    public function getProject(Request $request)
    {
        $project = Project::where('id', $request->id)->first();
        $teamData = Json::decode($project->assigned_team);
        $modules = Module::where('project_id', $project->id)->get();
        $assignedTeam = [];
        if ($teamData) {
            foreach ($teamData as $team) {
                $user = User::where('id', $team)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                $assignedTeam[] = $user;
            }
        }

        $projectData = [
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'status' => $project->status,
            'priority' => $project->priority,
            'workspace_id' => $project->workspace_id,
            'created_at' => $project->created_at,
            'updated_at' => $project->updated_at,
            'assigned_team' => $assignedTeam,
        ];
        return response()->json(['project' => $projectData, 'modules' => $modules],  201);
    }

    //for getting all project data
    public function getAllProject()
    {
        $projects = Project::where('workspace_id', auth()->user()->workspace_id)->get();
        $projectData = [];
        foreach ($projects as $project) {
            $assignedTeamData = [];
            $assignedTeams = [];
            $teams = Json::decode($project->assigned_team);
            if ($teams) {
                foreach ($teams as $team) {
                    if (!in_array($team, $assignedTeamData)) {
                        $assignedTeamData[] = $team;
                    }
                }
                foreach ($assignedTeamData as $teamData) {
                    $user = User::where('id', $teamData)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                    $assignedTeams[] = $user;
                }
            }
            $projectData[] = [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'status' => $project->status,
                'priority' => $project->priority,
                'workspace_id' => $project->workspace_id,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,
                'assigned_team' => $assignedTeams,
            ];
        }
        return response()->json(['projects' => $projectData,],  201);
    }

    //for editing the project data
    public function editProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $project = Project::where('id', $request->id)->first();
        $assignedTeam = Json::encode($request->assigned_team);
        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'workspace_id' => auth()->user()->workspace_id,
            'assigned_team' => $assignedTeam,
        ]);
        return response()->json(['message' => "Project Updated Successfully", 'project' => $project], 201);
    }

    //for deleting the project
    public function deleteProject(Request $request)
    {
        $project = Project::where('id', $request->id)->first();
        $project->delete();
        return response()->json(['message' => "Project Deleted Successfully", $project], 201);
    }
}
