<?php

use App\Http\Controllers\Api\V1\ModuloController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginRegisterController;

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
    Route::apiResource('modulos', ModuloController::class);

    Route::prefix('V1')->group(function () {
        Route::get('/modulos/{modulo}', [ModuloController::class, 'show'])
            ->missing(function () {
                return response()->json(['error' => 'El módulo no existe'], 404);
            });

        Route::post('/modulos/update/{modulo}', [ModuloController::class, 'update'])
            ->missing(function () {
                return response()->json(['error' => 'El módulo no existe'], 404);
            });

        Route::delete('/modulos/destroy/{modulo}', [ModuloController::class, 'destroy'])
            ->missing(function () {
                return response()->json(['error' => 'El módulo no existe'], 404);
            });

        Route::resource('/especialidades', EspecialidadController::class);
    });
});


Route::controller(LoginRegisterController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});
