<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('dish', 'App\Http\Controllers\DishController@index');
Route::get('dish/{id}', 'App\Http\Controllers\DishController@show');
Route::post('dish', 'App\Http\Controllers\DishController@store');
Route::put('dish/{id}', 'App\Http\Controllers\DishController@store');
Route::delete('dish/{id}', 'App\Http\Controllers\DishController@store');

