<?php

use App\Admin\Controllers\Module\ModuleController;
use App\Admin\Controllers\Org\OrganizationController;
use App\Admin\Controllers\Project\ProjectController;
use App\Admin\Controllers\Task\TaskBoardController;
use App\Admin\Controllers\Task\TaskController;
use App\Admin\Controllers\Team\TeamController;
use App\Admin\Controllers\Workspace\WorkspaceController;
use Illuminate\Routing\Router;
use OpenAdmin\Admin\Controllers\UserController;

Admin::routes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
    'as'            => config('admin.route.prefix') . '.',
], function (Router $router) {

    $router->get('/', 'HomeController@index')->name('home');
    $router->resource('workspaces', WorkspaceController::class);
    $router->resource('teams', TeamController::class);
    $router->resource('projects', ProjectController::class);
    $router->resource('tasks', TaskController::class);
    $router->resource('modules', ModuleController::class);

});
