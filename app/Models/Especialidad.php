<?php

namespace App\Models;

use App\Http\Resources\EspecialidadResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Especialidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nombre',
        

        
    ];

   
}
