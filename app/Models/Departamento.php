<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nombre',
        
        
        

        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
