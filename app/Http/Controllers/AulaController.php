<?php

namespace App\Http\Controllers;

use App\Http\Requests\AulaRequest;
use App\Http\Resources\AulaResource;
use App\Models\Aula;
use Illuminate\Http\Request;


class AulaController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $aulas = Aula::all();
        return Aula::collection($aulas);
        

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Aula  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function show(Aula $aula)
    {
        return new AulaResource($aula);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AulaRequest $request)
    {
        $aula = Aula::create($request->all());

        return (new AulaResource($aula))
            ->response()
            ->setStatusCode(201); // Código de estado 201 (Created)
    }

    
    public function update(AulaRequest $request, Aula $aula)
    {
        $aula->update($request->all());

        return response()->json(['message' => 'Aula actualizada con éxito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Aula $aula)
    {
        $aula->delete();

        return response()->json(['message' => 'Aula eliminada con éxito']);
    }

    public function todos(Aula $aulas){
        $aulas = Aula::all();

        return response()->json($aulas);

    }
}
