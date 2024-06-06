<?php

namespace App\Admin\Controllers\Workspace;

use App\Models\User;
use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Workspace;

class WorkspaceController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Workspace';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Workspace());

        $grid->column('id', __('Id'));
        $grid->column('name', __('Name'));
        $grid->column('description', __('Description'));
        $grid->column('size', __('Size'));
        $grid->column('logo', __('Logo'));
        $grid->column('user_id', __('User'))->display(function($id){
            return User::find($id)->name;
        });
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));
        $grid->column('deleted_at', __('Deleted at'));

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
        $show = new Show(Workspace::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('description', __('Description'));
        $show->field('slug', __('Slug'));
        $show->field('size', __('Size'));
        $show->field('logo', __('Logo'));
        $show->field('user_id', __('User id'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));
        $show->field('deleted_at', __('Deleted at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Workspace());

        $form->textarea('name', __('Name'));
        $form->textarea('description', __('Description'));
        $form->select('size', __('Size'))->options(['0-5'=>'0-5','5-10'=>'5-10','10-20'=>'10-20','20-30'=>'20-30','40+'=>'40+']);
        $form->select('user_id', __('User id'))->options(User::pluck('name','id'));
        $form->image('logo', __('Logo'));
        return $form;
    }
}
