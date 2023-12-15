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
    public function index()
    {
        // return public_path('form');



        // return File::get(public_path('form.html'));
        $modulos = Modulo::all();


        return ModuloResource::collection($modulos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'codigo' => 'required|string',
            'nombre' => 'required|string',
            'horas_semanales' => 'required|integer',
            'horas_totales' => 'required|integer',
            'user_id' => 'required|integer',
            'especialidad_id' => 'required|integer',
            'curso_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $modulo = Modulo::create($request->all());

        return new ModuloResource($modulo);
    }

    public function show(Modulo $modulo)
    {
        // $modulo = Modulo::findOrFail($id);
        // dd($modulo);
        return new ModuloResource($modulo);
    }

    public function update(Request $request, Modulo $modulo)
    {
        $validator = Validator::make($request->all(), [

            'codigo' => 'string',
            'nombre' => 'string',
            'horas_semanales' => 'integer',
            'horas_totales' => 'integer',
            'user_id' => 'required|integer',
            'especialidad_id' => 'integer',
            'curso_id' => 'integer',
            'CargaHoraria' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $modulo->update($request->all());

        return new ModuloResource($modulo);
    }

    public function destroy(Modulo $modulo)
    {
        // $modulo = Modulo::findOrFail($modulo);
        $modulo->delete();

        return response()->json(null, 204);
    }

    public function modulosPorEspecialidad($especialidadid)
    {
        // Obtén todos los módulos que tienen la especialidad_id proporcionada
        $modulos = Modulo::where('especialidad_id', $especialidadid)->get();

        return response()->json(['modulos' => $modulos]);
    }   

    public function modulosPorUsuario($userid)
    {
        // Obtén todos los módulos que tienen la user_id proporcionada
        $modulos = Modulo::where('user_id', $userid)->get();

        return response()->json(['modulos' => $modulos]);
    }   

    public function mostrarDatosAula($aulaId)
    {
        // Obtén los datos del aula por ID
        $datosAula = Modulo::where('aula_id', $aulaId)->first();

        // Puedes pasar los datos a una vista o devolverlos como respuesta JSON, según tus necesidades
         return response()->json($datosAula);
    }

}
