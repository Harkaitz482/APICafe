<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nombre',
        'turno',
        
        

        
    ];

    public function modulos()
    {
        return $this->belongsTo(Modulo::class);
    }

}
