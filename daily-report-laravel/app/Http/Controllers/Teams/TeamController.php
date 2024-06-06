<?php

namespace App\Http\Controllers\Teams;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TeamController extends Controller
{

    //add user to team
    public function sendTeamInvitation(Request $request)
    {
        $existingcheck_user = User::where('email', $request->email)->exists();
        if ($existingcheck_user) {
            $user = User::where('email', $request->email)->first();
            if ($user->id == auth()->user()->id) {
                return response(['errors' => 'Cannot Invite yourself'], 401);
            } else {
                $existing_team = Team::where('user_id', $user->id)->where('workspace_id', auth()->user()->workspace_id)->exists();
                if (!$existing_team) {
                    $team = Team::create([
                        'workspace_id' => auth()->user()->workspace_id,
                        'user_id' => $user->id,
                        'user_role_id' => $request->user_role_id,
                        'status' => "Pending",
                    ]);
                    Mail::send(
                        "emails.teamJoiningInvitation",
                        ['id' => $team->id, 'user' => $user],
                        function ($message) use ($request) {
                            $message->to($request->email);
                            $message->subject("Invitation for joining team");
                        }
                    );
                    return response(['message' => 'Mail sent to user for joining the team', 'team' => $team], 201);
                } else {
                    $check_team = Team::where('user_id', $user->id)->where('workspace_id', auth()->user()->workspace_id)->where('status', 'pending')->exists();
                    $existing_team_data = Team::where('user_id', $user->id)->where('workspace_id', auth()->user()->workspace_id)->first();
                    if ($check_team) {
                        Mail::send(
                            "emails.teamJoiningInvitation",
                            ['id' => $existing_team_data->id, 'user' => $user],
                            function ($message) use ($request) {
                                $message->to($request->email);
                                $message->subject("Invitation for joining team");
                            }
                        );
                        return response(['message' => 'Team Already Added. Mail Sent Again for joining the team', 'team' => $existing_team_data], 201);
                    } else {
                        return response(['errors' => 'User Already Exist In the Workspace.'], 402);
                    }
                }
            }
        } else {
            return response(['errors' => ['User Does not exist']], 401);
        }
    }
    //for adding new team in the workspace
    public function acceptTeamInvitation($id)
    {
        $team = Team::where('id', $id)->first();
        $team->update([
            'status' => 'Active',
        ]);
        return redirect('https://daily-report-one.vercel.app/dashboard');
    }

    //for getting members details in the workspace
    public function getTeam()
    {
        $teams = Team::where('workspace_id', auth()->user()->workspace_id)->get();
        $data = [];
        foreach ($teams as $team) {
            $user = User::where('id', $team->user_id)->first();
            $data[] = [
                'id' => $team->id,
                'workspace_id' => $team->workspace_id,
                'user_role_id' => $team->user_role_id,
                'status' => $team->status,
                'created_at' => $team->created_at,
                'updated_at' => $team->updated_at,
                'user' => $user,
            ];
        }
        return response()->json(['team' => $data], 200);
    }


    //for editing team in the workspace
    public function editTeam(Request $request)
    {
        $team = Team::where('id', $request->id)->first();
        $team->update([
            'user_role_id' => $request->user_role_id,
        ]);
        return response([
            'message' => 'Role Updated Successfully',
            'team' => $team,
        ], 201);
    }

    //for deleting team in the workspace
    public function deleteTeam(Request $request)
    {
        $team = Team::where('id', $request->id)->first();
        $team->delete();
        return response([
            'message' => 'Team Deleted Successfully',
            'team' => $team
        ], 201);
    }
}
