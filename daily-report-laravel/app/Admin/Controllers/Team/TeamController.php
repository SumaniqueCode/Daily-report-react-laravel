<?php

namespace App\Admin\Controllers\Team;

use App\Models\Organization;
use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Team;
use App\Models\User;
use App\Models\Workspace;

class TeamController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Team';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Team());

        $grid->column('id', __('Id'));
        $grid->column('workspace_id', __('Workspace id'))->display(function($id){
            return Workspace::find($id)->name;
        });
        $grid->column('user_id', __('User id'))->display(function($id){
            return User::find($id)->email;
        });
        $grid->column('user_role_id', __('Role'))->display(function($id){
            if($id ==1){
                return 'Admin';
            }elseif($id == 2){
                return 'Co-Worker';
            }else{
                return 'Guest';
            }
        });
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(Team::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('workspace_id', __('Workspace id'));
        $show->field('user_id', __('User id'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Team());

        $form->select('workspace_id', __('Workspace id'))->options(Workspace::all()->pluck('name', 'id'));
        $form->select('user_id', __('User id'))->options(User::all()->pluck('email', 'id'));
        $form->select('user_role_id', __('User Role'))->options(['1'=>'Admin','2'=> 'Co-Worker','3'=> 'Guest']);
        $form->select('status', __('Status'))->options(['Pending'=>'Pending','2'=> 'Active',]);

        return $form;
    }
}
