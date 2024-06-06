<?php

namespace App\Admin\Controllers\Project;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Project;
use App\Models\User;
use App\Models\Workspace;

class ProjectController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Project';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Project());

        $grid->column('id', __('Id'));
        $grid->column('name', __('Name'));
            $grid->column('status', __('Status'))->display(function ($id) {
            if ($id == 1) {
                return 'Dealing';
            }elseif( $id == 2) {
                return 'Pending';
            }elseif($id == 3) {
                return 'On-Progress';
            }else{
                return 'done';
            }
        })->label([
            "1" => "danger",
            "2" => "warning",
            "3" => "info",
            "4" => "success"
        ]);
        $grid->column('prority', __('Prority'))->display(function ($id) {
            if ($id == 1) {
                return 'High';
            }elseif( $id == 2) {
                return 'Medium';
            }else{
                return 'Low';
            }
        })->label([
            "1" => "danger",
            "2" => "warning",
            "3" => "success"
        ]);
        $grid->column('assinged_team', __('Assinged team'))->display(function ($arr) {
            $str = '';
            foreach ($arr as $user) {
                $user_name  = User::where('id', $user)->value('name');
                $str .= '<span class="badge rounded-pill bg-secondary">' . $user_name . '</span> ';
            }
            return $str;
        });
        $grid->column('workspace_id', __('Workspace id'))->display(function($id){
            return Workspace::where('id', $id)->value('name');
        });
        $grid->column('created_at', __('Created at'));
        
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
        $show = new Show(Project::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('description', __('Description'));
        $show->field('status', __('Status'));
        $show->field('prority', __('Prority'));
        $show->field('assinged_team', __('Assinged team'));
        $show->field('org_id', __('Org id'));
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
        $form = new Form(new Project());

        $form->text('name', __('Name'));
        $form->textarea('description', __('Description'));
        $form->select('status', __('Status'))->options(['1' => 'dealing', '2' => 'pending', '3' => 'on-progress', '4' => 'done']);
        $form->select('prority', __('Prority'))->options(['1' => 'high', '2' => 'medium', '3' => 'low',]);
        $form->multipleSelect('assinged_team', __('Assinged team'))->options(User::all()->pluck('name', 'id'));
        $form->select('workspace_id', __('Workspace id'))->options(Workspace::all()->pluck('name', 'id'));

        return $form;
    }
}
