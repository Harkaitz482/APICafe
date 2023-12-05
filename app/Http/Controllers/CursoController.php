<?php

namespace App\Http\Controllers;

use App\Http\Requests\CursoRequest;
use App\Http\Resources\CursoResource;
use App\Models\Curso;
use Illuminate\Http\Request;




class CursoController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cursos = Curso::all();
        return Curso::collection($cursos);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Curso  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function show(Curso $curso)
    {
        return new CursoResource($curso);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CursoRequest $request)
    {
        $curso = Curso::create($request->all());

        return (new CursoResource($curso))
            ->response()
            ->setStatusCode(201); // Código de estado 201 (Created)
    }

    
    public function update(CursoRequest $request, Curso $curso)
    {
        $curso->update($request->all());

        return response()->json(['message' => 'Curso actualizada con éxito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Curso $curso)
    {
        $curso->delete();

        return response()->json(['message' => 'Curso eliminada con éxito']);
    }
}
