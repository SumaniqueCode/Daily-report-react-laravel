<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    // use Sluggable;
    protected $fillable = [
        'workspace_id',
        'user_id',
        'user_role_id',
        'status',
    ];

    // public function sluggable(): array
    // {
    //     return [
    //         'slug' => [
    //             'source' => 'workspace_id'
    //         ]
    //     ];
    // }
}
