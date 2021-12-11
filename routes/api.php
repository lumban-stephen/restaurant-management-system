<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DishController;

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


Route::get('dish', [DishController::class, 'index']);
Route::post('/add-dish', [DishController::class, 'store']);
Route::get('/edit-dish/{id}', [DishController::class, 'edit']);
Route::put('update-dish/{id}', [DishController::class, 'update']);
Route::delete('delete-dish/{id}', [DishController::class, 'destroy']);

