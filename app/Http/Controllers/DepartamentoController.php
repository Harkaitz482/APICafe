<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartamentoRequest;
use App\Http\Resources\DepartamentoResource;
use App\Models\Departamento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $departamentos = Departamento::all();
        return Departamento::collection($departamentos);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Departamento  $departamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Departamento $departamento)
    {
        return new DepartamentoResource($departamento);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\DepartamentoRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(DepartamentoRequest $request)
    {
        $departamento = Departamento::create($request->all());

        return response()->json(new DepartamentoResource($departamento), 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\DepartamentoRequest  $request
     * @param  \App\Models\Departamento  $departamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(DepartamentoRequest $request, Departamento $departamento)
    {
        $departamento->update($request->all());

        return response()->json(['message' => 'Departamento actualizado con éxito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Departamento  $departamento
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Departamento $departamento)
    {
        $departamento->delete();

        return response()->json(['message' => 'Departamento eliminado con éxito']);
    }
}
