<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class ProfileController extends Controller
{
    public function getUser()
    {
        $current_user = auth()->user();
        return response()->json([
            'user' => $current_user,
        ], 200);
    }

    public function editUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => [
                'nullable',
                'string',
                'min:3',
                'max:255',
                Rule::unique('users')->ignore(auth()->user()->id)->where(function ($query) use ($request) {
                    return !is_null($request->name);
                }),
            ],
            'display_name' => 'required|string|min:3|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $current_user = auth()->user();
        $user = User::where('id', $current_user->id)->first();
        $user->name = $request->name;
        $user->display_name = $request->display_name;
        if ($request->profile_picture) {
            $user->profile_picture = $request->profile_picture;
        } else {
            $user->profile_picture = auth()->user()->profile_picture;
        }
        if ($request->password) {
            if (Hash::check($request->old_password, $user->password)) {
                $user->password = Hash::make($request->password);
            } else {
                return response()->json([
                    'errors' => 'Old Password Did Not match',
                ], 422);
            }
        }
        $user->update();
        return response()->json([
            'message' => 'User Details Updated successfully',
            'user' => $user,
        ], 201);
    }

    public function fetchUser(Request $request)
    {
        $users = User::where('email', 'like', '%' . $request->email . '%')->get();
        return response()->json(['users' => $users]);
    }
}
