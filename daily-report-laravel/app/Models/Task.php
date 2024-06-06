<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];
    protected $casts = [
        'assigned_team' =>'json',
    ];
}
