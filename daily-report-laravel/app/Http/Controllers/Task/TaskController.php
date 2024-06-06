<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function createTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|max:2500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $assignedTeam = Json::encode($request->assigned_team);
        $task = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'module_id' => $request->module_id,
            'project_id' => $request->project_id,
            'start_date' => $request->due_date,
            'due_date' => $request->due_date,
            'assigned_team' => $assignedTeam,
        ]);
        return response()->json(['message' => "Task Added Successfully", 'task' => $task], 201);
    }

    public function getAllTask(Request $request)
    {
        $projects = Project::where('workspace_id', Auth::user()->workspace_id)->get();
        $allTask = [];
        foreach ($projects as $project) {
            $tasks = Task::where('project_id', $project->id)->get();
            foreach ($tasks as $singleTask) {
                $assignedTeamData = [];
                $assignedTeams = [];
                $teams = Json::decode($singleTask->assigned_team);
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
                $taskData = [
                    'id' => $singleTask->id,
                    'name' => $singleTask->name,
                    'description' => $singleTask->description,
                    'status' => $singleTask->status,
                    'priority' => $singleTask->priority,
                    'module_id' => $singleTask->module_id,
                    'project_id' => $singleTask->project_id,
                    'start_date' => $singleTask->due_date,
                    'due_date' => $singleTask->due_date,
                    'created_at' => $singleTask->created_at,
                    'updated_at' => $singleTask->updated_at,
                    'assigned_team' => $assignedTeams,
                ];
                $allTask[] = $taskData;
            }
        }
        return response()->json(['task' => $allTask],  201);
    }

    public function getMyTask()
    {
        $tasks = Task::all();
        $myTasks = [];
        $allTask = [];
        $userId = Auth::User()->id;
        foreach ($tasks as $task) {
            $taskTeamData = Json::decode($task->assigned_team);
            if ($taskTeamData) {
                foreach ($taskTeamData as $taskTeam) {
                    if ($userId == $taskTeam) {
                        $myTasks[] = $task;
                    }
                }
            }
        }
        if ($myTasks) {
            foreach ($myTasks as $singleTask) {
                $assignedTeamData = [];
                $assignedTeams = [];
                $teams = Json::decode($singleTask->assigned_team);
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
                $taskData = [
                    'id' => $singleTask->id,
                    'name' => $singleTask->name,
                    'description' => $singleTask->description,
                    'status' => $singleTask->status,
                    'priority' => $singleTask->priority,
                    'module_id' => $singleTask->module_id,
                    'project_id' => $singleTask->project_id,
                    'start_date' => $singleTask->due_date,
                    'due_date' => $singleTask->due_date,
                    'created_at' => $singleTask->created_at,
                    'updated_at' => $singleTask->updated_at,
                    'assigned_team' => $assignedTeams,
                ];
                $allTask[] = $taskData;
            }
            return response()->json(['task' => $allTask],  201);
        }
    }

    public function getTask(Request $request)
    {

        $task = Task::where('id', $request->id)->first();
        $teamData = Json::decode($task->assigned_team);
        $assignedTeam = [];
        if ($teamData) {
            foreach ($teamData as $team) {
                $user = User::where('id', $team)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                $assignedTeam[] = $user;
            }
        }
        $taskData = [
            'id' => $task->id,
            'name' => $task->name,
            'description' => $task->description,
            'priority' => $task->priority,
            'status' => $task->status,
            'module_id' => $task->module_id,
            'project_id' => $task->project_id,
            'start_date' => $task->due_date,
            'due_date' => $task->due_date,
            'assigned_team' => $assignedTeam,
        ];
        return response()->json(['task' => $taskData],  201);
    }

    public function editTask(Request $request)
    {
        $task = Task::where('id', $request->id)->first();
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|max:2500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $assignedTeam = Json::encode($request->assigned_team);
        $task->update([
            'name' => $request->name,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'start_date' => $request->due_date,
            'due_date' => $request->due_date,
            'assigned_team' => $assignedTeam,
        ]);
        return response()->json(['message' => "Task Updated Successfully", 'task' => $task], 201);
    }

    public function deleteTask(Request $request)
    {
        $task = Task::where('id', $request->id)->first();
        $task->delete();
        return response()->json(['message' => "Task Deleted Successfully", 'task' => $task], 201);
    }
}
