<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\GoogleLoginController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Workspace\WorkspaceController;
use App\Http\Controllers\Teams\TeamController;
use App\Http\Controllers\Module\ModuleController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Task\TaskBoardController;
use App\Http\Controllers\Task\TaskController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// not logged in user routes
Route::get('/accept-team-invitation/{id}', [TeamController::class, 'acceptTeamInvitation']);
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthApiController::class, 'register']);
    Route::post('login', [AuthApiController::class, 'login']);
    Route::post('forgot-password', [AuthApiController::class, 'forgotPassword']);
    Route::post('check-reset-token', [AuthApiController::class, 'checkResetToken']);
    Route::post('change-password', [AuthApiController::class, 'changePassword']);

    // routes for google login
    Route::get('/google-login', [GoogleLoginController::class, 'loginRedirect']);
    Route::get('/google-login/callback', [GoogleLoginController::class, 'handleGoogleCallback']);
});
Route::post('fetch-user', [ProfileController::class, 'fetchUser']);
// loggedin user routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthApiController::class, 'logout']);
    Route::get('login-status', [AuthApiController::class, 'loginStatus']);
    Route::get('get-user', [ProfileController::class, 'getUser']);
    Route::post('edit-user', [ProfileController::class, 'editUser']);

    //workspace routes
    Route::get('/get-workspace', [WorkspaceController::class, 'getWorkspace']);
    Route::post('/create-workspace', [WorkspaceController::class, 'createWorkSpace']);
    Route::post('/edit-workspace', [WorkspaceController::class, 'editWorkSpace']);
    Route::delete('/delete-workspace', [WorkspaceController::class, 'deleteWorkSpace']);
    Route::post('/switch-workspace', [WorkspaceController::class, 'switchWorkspace']);

    //team routes
    Route::post('/send-team-invitation', [TeamController::class, 'sendTeamInvitation']);
    Route::get('/get-team', [TeamController::class, 'getTeam']);
    Route::post('/edit-team', [TeamController::class, 'editTeam']);
    Route::delete('/delete-team', [TeamController::class, 'deleteTeam']);

    //module routes
    Route::post('/create-module', [ModuleController::class, 'createModule']);
    Route::post('/get-module', [ModuleController::class, 'getModule']);
    Route::post('/get-all-module', [ModuleController::class, 'getAllModule']);
    Route::post('/edit-module', [ModuleController::class, 'editModule']);
    Route::delete('/delete-module', [ModuleController::class, 'deleteModule']);

    //project routes
    Route::post('/add-project', [ProjectController::class, 'addProject']);
    Route::post('/get-project', [ProjectController::class, 'getProject']);
    Route::get('/get-all-project', [ProjectController::class, 'getAllProject']);
    Route::post('/edit-project', [ProjectController::class, 'editProject']);
    Route::delete('/delete-project', [ProjectController::class, 'deleteProject']);

    //task routes
    Route::post('/add-task', [TaskController::class, 'createTask']);
    Route::post('/get-task', [TaskController::class, 'getTask']);
    Route::get('/get-all-task', [TaskController::class, 'getAllTask']);
    Route::get('/get-my-task', [TaskController::class, 'getMyTask']);
    Route::post('/edit-task', [TaskController::class, 'editTask']);
    Route::delete('/delete-task', [TaskController::class, 'deleteTask']);
});
