<?php

use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\JefeDepartamentoController;
use App\Http\Controllers\JefeEstudiosController;
use Illuminate\Support\Facades\Route;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});





Route::get('/form', [App\Http\Controllers\Api\V1\ModuloController::class, 'index']);

Route::post('/login', [App\Http\Controllers\Auth\LoginRegisterController::class, 'login']);


Route::get('/jefe-estudios/modulos', [JefeEstudiosController::class, 'index']);
Route::get('/jefe-departamento/modulos', [JefeDepartamentoController::class, 'index']);

