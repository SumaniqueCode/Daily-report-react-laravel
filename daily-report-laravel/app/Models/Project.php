<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use Sluggable;
    use HasFactory;
    protected $casts = [
        'assigned_team' =>'json',
    ];
    
    protected $fillable = [
        'name',
        'description',
        'status',
        'priority',
        'workspace_id',
        'assigned_team',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
