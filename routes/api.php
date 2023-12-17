<?php

use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\AulaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\EspecialidadController;
use App\Http\Controllers\DepartamentoController;  



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    
    Route::prefix('V1')->group(function () {

        Route::apiResource('modulos', ModuloController::class)->missing (function () {
            return response()->json(['error' => 'El módulo no existe'], 404);
        });

        // Route::get('/modulos/{modulo}', [ModuloController::class, 'show'])
        //     ->missing(function () {
        //         return response()->json(['error' => 'El módulo no existe'], 404);
        //     });

        // Route::post('/modulos/update/{modulo}', [ModuloController::class, 'update'])
        //     ->missing(function () {
        //         return response()->json(['error' => 'El módulo no existe'], 404);
        //     });

        // Route::delete('/modulos/destroy/{modulo}', [ModuloController::class, 'destroy'])
        //     ->missing(function () {
        //         return response()->json(['error' => 'El módulo no existe'], 404);
        //     });

        Route::get('/especialidades/{especialidad}', [EspecialidadController::class,'show']);
        Route::get('/modulos/especialidad/{especialidadid}', [ModuloController::class, 'modulosPorEspecialidad']);
        Route::get('/departamento/{departamentoId}', [DepartamentoController::class, 'show']);
        Route::get('/modulos/users/{userid}', [ModuloController::class, 'modulosPorUsuario']);
        Route::get('/departamentos', [DepartamentoController::class, 'todos']);
        Route::get('/modulos/aula/{aulaId}', [ModuloController::class, 'mostrarDatosAula']);
        Route::get('/users/{departamento_id}', [LoginRegisterController::class, 'obtenerUsuariosPorDepartamento']);
        Route::get('/aulas', [AulaController::class, 'todos']);
        Route::post('/users/update/{user}', [LoginRegisterController::class, 'update']);






    });
});


Route::controller(LoginRegisterController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout','logout');
    Route::get('/users', [LoginRegisterController::class, 'show']);

});


