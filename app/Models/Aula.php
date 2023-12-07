<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'numero',
        'disponibilidad',
        
        

        
    ];
    public function modulos()
    {
        return $this->belongsToMany(Modulo::class);
    }
}