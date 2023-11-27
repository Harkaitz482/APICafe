<?php

namespace App\Http\Controllers;

use App\Models\Especialidad;
use Illuminate\Http\Request;
use App\Http\Requests\EspecialidadRequest;
use App\Http\Resources\EspecialidadResource;

class EspecialidadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $especialidades = Especialidad::all();
        return EspecialidadResource::collection($especialidades);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function show(Especialidad $especialidad)
    {
        return new EspecialidadResource($especialidad);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EspecialidadRequest $request)
    {
        $especialidad = Especialidad::create($request->all());

        return (new EspecialidadResource($especialidad))
            ->response()
            ->setStatusCode(201); // Código de estado 201 (Created)
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\EspecialidadRequest  $request
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function update(EspecialidadRequest $request, Especialidad $especialidad)
    {
        $especialidad->update($request->all());

        return response()->json(['message' => 'Especialidad actualizada con éxito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Especialidad $especialidad)
    {
        $especialidad->delete();

        return response()->json(['message' => 'Especialidad eliminada con éxito']);
    }
}
