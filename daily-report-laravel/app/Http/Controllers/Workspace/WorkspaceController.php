<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkspaceController extends Controller
{
    function getWorkspace()
    {
        $my_workspace = Workspace::where('user_id', auth()->user()->id)->get();
        $teams = Team::where('user_id', auth()->user()->id)->where('status', 'active')->get();
        $current_workspace = Workspace::where('id', auth()->user()->workspace_id)->first();
        $joined_workspace = [];
        foreach ($teams as $team) {
            $workspace = Workspace::where('id', $team->workspace_id)->first();
            $joined_workspace[] = $workspace;
        }
            return response([
                'current_workspace'=> $current_workspace,
                'my_workspace' => $my_workspace,
                'joined_workspace' => $joined_workspace
            ]);
    }

    function createWorkSpace(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string |min:5|max:25',
            'size' => 'nullable|string',
            'logo' => 'nullable|string',
            'description' => 'nullable|string|max:2500'
        ]);

        // Set the user_id based on the authenticated user
        $data['user_id'] = auth()->user()->id;

        $workspace = Workspace::create($data);

        // after creating workspace set the workspace id to user workspace_id column
        $current_user = User::where('id', auth()->user()->id);
        $current_user->update([
            'workspace_id' => $workspace->id,

        ]);

        return response()->json($workspace, 201);
    }

    //edit workspace
    function editWorkSpace(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string |min:5|max:25',
            'description' => 'nullable|string|max:2500',
            'size' => 'nullable|string',
            'logo' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $workspace = Workspace::where('id', $request->id)->first();
        $workspace->update([
            'name' => $request->name,
            'description' => $request->description,
            'size' => $request->size,
            'logo' => $request->logo,
        ]);

        return response([
            'message' => 'Work Space Updated Successfully',
            'workspace' => $workspace,
        ], 201);
    }

    //delete workspace
    public function deleteWorkSpace(Request $request)
    {
        $workspace = Workspace::where('id', $request->id)->first();
        $workspace->delete();
        return response(['message' => 'Work Space Deleted Successfully'], 201);
    }

    // switch workspace

    public function switchWorkspace(Request $request)
    {
        $current_user = User::where('id', auth()->user()->id)->first();
        $current_user->update([
            'workspace_id' => $request->workspace_id,
        ]);
        return response(['message' => 'Work Space Switched', 'id'=>$current_user->workspace_id], 201);
    }
}
