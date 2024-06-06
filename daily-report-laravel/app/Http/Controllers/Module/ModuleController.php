<?php

namespace App\Http\Controllers\Module;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{
    public function createModule(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $assignedTeam = Json::encode($request->assigned_team);
        $lead = Json::encode($request->lead);
        $module = Module::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'project_id' => $request->project_id,
            'assigned_team' => $assignedTeam,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'lead' => $lead,
        ]);
        return response()->json(['message' => "Module Added Successfully", 'module' => $module], 201);
    }
    public function getModule(Request $request)
    {
        $module = Module::where('id', $request->id)->first();
            $assignedTeams = [];
            $assignedTeamData = [];
            $leaders = [];
            $leadsData = [];
            $teams = Json::decode($module->assigned_team);
            $leads = Json::decode($module->lead);
            if ($teams) {
                foreach ($teams as $team) {
                    if (!in_array($team, $assignedTeamData)) {
                        $assignedTeamData[] = $team;
                    }
                }
                foreach ($assignedTeamData as $teamData) {
                    $assigneduser = User::where('id', $teamData)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                    $assignedTeams[] = $assigneduser;
                }
            }
            if ($leads) {
                foreach ($leads as $lead) {
                    if (!in_array($lead, $leadsData)) {
                        $leadsData[] = $lead;
                    }
                }
                foreach ($leadsData as $leadData) {
                    $assignedlead = User::where('id', $leadData)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                    $leaders[] = $assignedlead;
                }
            }
            $modules[] = [
                'id' => $module->id,
                'name' => $module->name,
                'description' => $module->description,
                'status' => $module->status,
                'project_id' => $module->project_id,
                'start_date' => $module->start_date,
                'end_date' => $module->end_date,
                'updated_at' => $module->updated_at,
                'assigned_team' => $assignedTeams,
                'lead' => $leaders,
            ];
        return response()->json(['modules' =>$modules], 201);
    }
    public function getAllModule(Request $request)
    {
        $modulesData = Module::where('project_id', $request->project_id)->get();
        $modules = [];

        foreach ($modulesData as $module) {
            $assignedTeams = [];
            $assignedTeamData = [];
            $leaders = [];
            $leadsData = [];
            $teams = Json::decode($module->assigned_team);
            $leads = Json::decode($module->lead);
            if ($teams) {
                foreach ($teams as $team) {
                    if (!in_array($team, $assignedTeamData)) {
                        $assignedTeamData[] = $team;
                    }
                }
                foreach ($assignedTeamData as $teamData) {
                    $assigneduser = User::where('id', $teamData)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                    $assignedTeams[] = $assigneduser;
                }
            }
            if ($leads) {
                foreach ($leads as $lead) {
                    if (!in_array($lead, $leadsData)) {
                        $leadsData[] = $lead;
                    }
                }
                foreach ($leadsData as $leadData) {
                    $assignedlead = User::where('id', $leadData)->first(['id', 'name', 'display_name', 'email', 'profile_picture']);
                    $leaders[] = $assignedlead;
                }
            }
            $modules[] = [
                'id' => $module->id,
                'name' => $module->name,
                'description' => $module->description,
                'status' => $module->status,
                'project_id' => $module->project_id,
                'start_date' => $module->start_date,
                'end_date' => $module->end_date,
                'updated_at' => $module->updated_at,
                'assigned_team' => $assignedTeams,
                'lead' => $leaders,
            ];
        }
        return response()->json(['modules' =>$modules], 201);
    }
    public function editModule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1500',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $assignedTeam = Json::encode($request->assigned_team);
        $lead = Json::encode($request->lead);
        $module = Module::where('id', $request->id)->first();
        $module->update([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'project_id' => $request->project_id,
            'assigned_team' => $assignedTeam,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'lead' => $lead,
        ]);
        return response()->json(['message' => "Module Updated Successfully", 'module' => $module], 201);
    }
    public function deleteModule(Request $request)
    {
        $module = Module::where('id', $request->id)->first();
        $module->delete();
        return response()->json(['message' => 'module deleted successfully', 'module' => $module], 201);
    }
}
