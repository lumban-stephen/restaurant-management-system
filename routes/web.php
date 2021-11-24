<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return view('auth/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';

//dish
Route::get('/dish',[App\Http\Controllers\DishController::class,'show'])->name('/dish');
//creat new dish
Route::get('/create_new_dish',[App\Http\Controllers\DishController::class,'new_dish'])->name('/create_new_dish');
//add data to dish table
Route::post('/add_new_dish',[App\Http\Controllers\DishController::class,'store']);
//delete dish
Route::get('/delete_dish/{id}',[App\Http\Controllers\DishController::class,'destroy']);
//Update dish
Route::get('/update_dish_page/{id}',[App\Http\Controllers\DishController::class,'update_view'])->name('/update_dish_page');
//Update database in dish
Route::post('/update_dish/{id}',[App\Http\Controllers\DishController::class,'update']);


//inventory
Route::get('/inventory',[App\Http\Controllers\InventoryController::class,'show'])->name('/inventory');
//creat new inventory
Route::get('/create_inventory',[App\Http\Controllers\InventoryController::class,'new_inventory'])->name('/create_inventory');
//add data to dish table
Route::post('/add_new_inventory',[App\Http\Controllers\InventoryController::class,'store']);
//delete inventory
Route::get('/delete_inventory/{id}',[App\Http\Controllers\InventoryController::class,'destroy']);
//Update database in inventory
Route::get('/update_inventory_page/{id}',[App\Http\Controllers\InventoryController::class,'update_view'])->name('/update_inventory_page');
//Update database in inventory
Route::post('/update_inventory/{id}',[App\Http\Controllers\InventoryController::class,'update']);
//Restock database in inventory
Route::post('/restock_inventory/{id}',[App\Http\Controllers\InventoryController::class,'store']);