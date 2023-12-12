<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class JefeDepartamentoController extends Controller
{
    public function index()
    {
        // Obtén al usuario autenticado
        $user = auth()->user();

        // Verifica si el usuario está autenticado y tiene un departamento
        if ($user && $user->departamento) {
            // Obtén el departamento del usuario
            $departamento = $user->departamento;

            // Obtén todos los usuarios que tienen el mismo id de departamento
            $usuariosMismoDepartamento = User::where('departamento_id', $departamento->id)->get();

            return response()->json(['usuarios' => $usuariosMismoDepartamento]);
        } else {
            return response()->json(['error' => 'Usuario no autorizado o sin departamento'], 403);
        }
    }
}