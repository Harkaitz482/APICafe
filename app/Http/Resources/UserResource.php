<?php

namespace App\Http\Resources;

use App\Models\Departamento;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'name'=> $this->name,
        'email'=> $this->email ,
        'password'=> $this->password,
        'tipoUsuario' => $this->tipoUsuario,
        'departamento_id'=> new DepartamentoResource(($this->departamento))
        
        ];
    
        
    }
}
