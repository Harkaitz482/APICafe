<?php

namespace App\Http\Resources;

use App\Models\Especialidad;
use App\Models\Modulo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;




class ModuloResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray( Request $request)
    {
     
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'nombre' => $this->nombre,
            'horas_semanales' => $this->horas_semanales,
            'horas_totales' => $this->horas_totales,
            'user_id' => $this->user_id,
            // 'especialidad' =>  Modulo::find($this->id)->especialidad()->get(), 
            'especialidad'=> new EspecialidadResource(($this->especialidad)), // Asumiendo que hay una relación "especialidad"
            'curso'=> new CursoResource(($this->curso)), 
            'aula'=> new AulaResource(($this->aula)), 
             
            // Agrega otros campos según sea necesario
            // 'created_at' => $this->created_at,
            // 'updated_at' => $this->updated_at,
        ];
    }
}
