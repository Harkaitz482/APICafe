<?php

use App\Http\Controllers\Api\V1\ModuloController;
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

