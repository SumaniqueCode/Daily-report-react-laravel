<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class GoogleLoginController extends Controller
{
    //Google Login
    public function loginRedirect(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }
    // login with google auth
    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
            $is_user = User::where('email', $user->email)->first();
            if ($user->avatar) {
                $avatar = $user->avatar;
            } else {
                $avatar = '';
            }
            if ($is_user) {
                // Log in the existing user and create the token
                Auth::login($is_user);
                $token = $is_user->createToken('google-token')->plainTextToken;
                // Build the query string
                $data = ['token' => $token, 'user' => $is_user->id, 'workspace_id'=>$is_user->workspace_id];

                $query = http_build_query($data);
                // Redirect to the login page with the query string
                return redirect()->away('http://localhost:5173/google?'.$query);
            } else {
                $newUser = User::create([
                    'display_name' => $user->name,
                    'email' => $user->email,
                    'password' => Hash::make($user->name . '@' . $user->id),
                    'google_id' => $user->id,
                    'profile_picture' => $avatar,
                ]);
                // Log in the new user and create the token
                Auth::login($newUser);
                $token = $newUser->createToken('google-token')->plainTextToken;
                // Build the query string
                $data = ['token' => $token, 'user_id' => $newUser->id, 'workspace_id'=>$newUser->workspace_id];

                // return response(['data'=>$data, 'message'=>'User created and Logged In successfully'], 201);
            
                $query = http_build_query($data);
                // Redirect to the login page with the query string
                return redirect()->away('http://localhost:5173?'.$query);
            }
        } catch (\Throwable $th) {
            return response([
                'errors' => 'Invalid credentials' . $th,
                'status' => 400
            ]);
        }
    }
}
