<?php

namespace App\Admin\Controllers\Task;

use App\Models\Project;
use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Task;
use App\Models\TaskBoard;
use App\Models\User;

class TaskController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Task';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Task());

        $grid->column('id', __('Id'));
        $grid->column('name', __('Name'));
        $grid->column('status', __('Status'))->display(function ($id) {
            if ($id == 0) {
                return 'Backlog';
            } elseif ($id == 1) {
                return 'Pending';
            } elseif ($id == 2) {
                return 'In-Progress';
            } else {
                return 'Done';
            }
        })->label([
            "0" => "secondary",
            "1" => "warning",
            "2" => "info",
            "3" => "success"
        ]);
        $grid->column('prority', __('Prority'))->display(function ($id) {
            if ($id == 1) {
                return 'High';
            } elseif ($id == 2) {
                return 'Medium';
            } else {
                return 'Low';
            }
        })->label([
            "1" => "danger",
            "2" => "warning",
            "3" => "success"
        ]);
        $grid->column('assinged_to', __('Assinged to'))->display(function ($arr) {
            $str = '';
            if($arr){
            foreach ($arr as $user) {
                $user_name  = User::where('id', $user)->value('name');
                $str .= '<span class="badge rounded-pill bg-secondary">' . $user_name . '</span> ';
            }
        }
            return $str;
        });
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
        $show = new Show(Task::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('description', __('Description'));
        $show->field('status', __('Status'));
        $show->field('prority', __('Prority'));
        $show->field('assinged_to', __('Assinged to'));
        $show->field('task_board_id', __('Task Board id'));
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
        $form = new Form(new Task());

        $form->text('name', __('Name'));
        $form->ckeditor('description', __('Description'));
        $form->select('status', __('Status'))->options(['0' => 'Backlog', '1' => 'Pending', '2' => 'On-Progress', '3' => 'Completed']);
        $form->select('prority', __('Prority'))->options(['1' => 'High', '2' => 'Medium', '3' => 'Low']);
        $form->multipleSelect('assinged_to', __('Assinged to'))->options(User::all()->pluck('name', 'id'));
        $form->date('start_date', __('Start Date'));
        $form->date('due_date', __('Due Date'));

        return $form;
    }
}
