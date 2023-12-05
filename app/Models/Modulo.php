<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        
        'codigo',
        'nombre',
        'horas_semanales',
        'horas_totales',
        'user_id',
        'especialidad_id',
        'curso_id',
        'aula_id',
    ];

    

    // Relaciones (ejemplos, ajusta según tus necesidades):
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);

    }

    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    public function aula()
    {
        return $this->belongsToMany(Aula::class);
    }
}