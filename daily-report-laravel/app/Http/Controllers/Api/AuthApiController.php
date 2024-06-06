<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255|unique:users',
            'display_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['errors' => ['Invalid credentials']], 401);
        }

    // Retrieve the access token
    $accessToken = $user->createToken('auth_token')->plainTextToken;
           
    $user->update([
                'remember_token' => $accessToken,
            ]);

            return response(['user' => $user, 'token' => $accessToken], 201);
        }

    // check user login status
    public function loginStatus(Request $request)
    {
        try {
            $check_user_authentication = auth()->check();
            if ($check_user_authentication) {
                return response([
                    'status' => 200,
                    'message' => "user authenticated"
                ]);
            }
        } catch (\Throwable $th) {
            return response([
                'error' => 400,
            ]);
        }
    }
    // logout
    function logout(Request $request)
    {
        try {
            // Get bearer token from the request
            $accessToken = $request->bearerToken();
            // Get access token from database
            $token = PersonalAccessToken::findToken($accessToken);
            // Revoke token
            $token->delete();
            return response([
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response([
                'status' => 400
            ]);
        }
    }


    // forget password api
    public function forgotPassword(Request $request)
    {
        $check_old_token = PasswordResetToken::where('email',$request->email)->get();
        foreach ($check_old_token as $value) {
           $value->delete();
        }
        $check_user = User::where('email',$request->email)->exists();
        If($check_user){
        $user = User::where('email',$request->email)->first();
            $passwordReset = New PasswordResetToken;
            $token = Str::random(6);
            $passwordReset->token = $token;
            $passwordReset->email =  $request->email; 
            $passwordReset->save();

            Mail::send("emails.forgotPassword", ['token' => $token,'user'=> $user],
             function ($message) use ($request){
                $message->to($request->email);
                $message->subject("Reset your password");
                });
            return response(['message' => 'Check mail for reset token'], 201);
        }
        else{
            return response(['errors' => ['User Does not exist']], 401);
        }
    }

    // check the reset token
    public function checkResetToken(Request $request)
    {
        $user = PasswordResetToken::where('email', $request->email)->first();
        $token =  $request->token;
            if ( $token !== $user->token) {
                return response(['errors' => ['Invalid reset token']], 401);
            }
            else{
            return response(['message' => 'Valid reset token'], 201);
        }
    }
    // change password
    public function changePassword(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

            $user = User::where('email', $request->email)->first();
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            $passwordReset = PasswordResetToken::where('email',$request->email)->first();
            $passwordReset->delete();

            return response(['message' => 'Password Change Successfully'], 201);
    }
}
