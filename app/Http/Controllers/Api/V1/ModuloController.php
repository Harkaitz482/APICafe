<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Modulo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ModuloResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ModuloController extends Controller
{
    // Método para obtener todos los módulos
    public function index()
    {
        $modulos = Modulo::all();
        return ModuloResource::collection($modulos);
    }

    // Método para almacenar un nuevo módulo
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Definición de reglas de validación para los campos del módulo
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $modulo = Modulo::create($request->all());

        return new ModuloResource($modulo);
    }

    // Método para obtener los detalles de un módulo específico
    public function show(Modulo $modulo)
    {
        return new ModuloResource($modulo);
    }

    // Método para actualizar un módulo existente
    public function update(Request $request, Modulo $modulo)
    {
        $validator = Validator::make($request->all(), [
            // Definición de reglas de validación para los campos que se pueden actualizar
            'codigo' => 'string',
            'nombre' => 'string',
            'horas_semanales' => 'integer',
            'horas_totales' => 'integer',
            'user_id' => 'integer',
            'especialidad_id' => 'integer',
            'curso_id' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $modulo->update($request->all());

        return new ModuloResource($modulo);
    }

    // Método para eliminar un módulo
    public function destroy(Modulo $modulo)
    {
        $modulo->delete();
        return response()->json(null, 204);
    }

    // Método para obtener todos los módulos de una especialidad
    public function modulosPorEspecialidad($especialidadid)
    {
        $modulos = Modulo::where('especialidad_id', $especialidadid)->get();
        return response()->json(['modulos' => $modulos]);
    }

    // Método para obtener todos los módulos de un usuario
    public function modulosPorUsuario($userid)
    {
        $modulos = Modulo::where('user_id', $userid)->get();
        return response()->json(['modulos' => $modulos]);
    }

    // Método para mostrar los datos de un aula por su ID
    public function mostrarDatosAula($aulaId)
    {
        $datosAula = Modulo::where('aula_id', $aulaId)->first();
        return response()->json($datosAula);
    }
}
