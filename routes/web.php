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

Route::get('/account', function () {
    return Inertia::render('AccountSetting');
})->name('account');

Route::get('/employee', function () {
    return Inertia::render('EmployeeManagement');
})->name('employee');

Route::get('/inventorymanagement', function () {
    return Inertia::render('Inventory');
})->name('inventorymanagement');

Route::get('/pos', function () {
    return Inertia::render('Pos');
})->name('pos');

Route::get('/dish', function () {
    return Inertia::render('DishManagement');
})->name('dish');

Route::get('/orders', function () {
    return Inertia::render('OrderManagement');
})->name('ordermanagement');

require __DIR__.'/auth.php';

// Route::get('/orders', function () {
//     return view('Ordermanagement');
// });

//return inventory info
Route::get('/inventory',[App\Http\Controllers\InventoryController::class,'inventoryIndex']);

//return logged in user info
Route::get('/userinfo',[App\Http\Controllers\ProfileController::class,'userProfile']);

//return all users info
Route::get('/empinfo',[App\Http\Controllers\EmployeeController::class,'empInfo']);

//return all dish table info
Route::get('/dishindex',[App\Http\Controllers\DishController::class,'index']);

//return all dish ingredients info
Route::get('/dishingredientindex',[App\Http\Controllers\DishIngredientController::class,'dishIngredientIndex']);

//save dish info
Route::post('/dishsave',[App\Http\Controllers\DishController::class,'dishAdd']);

//update dish info
Route::post('/dishupdate',[App\Http\Controllers\DishController::class,'dishUpdate']);

//delete dish info
Route::post('/dishdel',[App\Http\Controllers\DishController::class,'dishDelete']);

//add ingredient to database
Route::post('/addIngredients',[App\Http\Controllers\InventoryController::class,'store']);
//update ingredient to database
Route::post('/updateIngredients',[App\Http\Controllers\InventoryController::class,'update']);
//delete ingredient in database
Route::post('/deleteIngredients',[App\Http\Controllers\InventoryController::class,'delete']);

//Order Records
Route::get('/orderrecord',[App\Http\Controllers\OrderRecordController::class,'index']);

//Order Management
Route::get('/orderindex',[App\Http\Controllers\OrderController::class,'index']);
Route::post('/addorder',[App\Http\Controllers\OrderController::class,'store']);
Route::get('//updateorder/{$id}',[App\Http\Controllers\OrderController::class,'update']);
Route::get('/deleteorder/{$id}',[App\Http\Controllers\OrderController::class,'delete']);

//Order Details
Route::get('/orderdetails',[App\Http\Controllers\OrderController::class,'index']);
Route::post('/adddetails',[App\Http\Controllers\OrderController::class,'store']);
Route::get('//updatedetails/{$id}',[App\Http\Controllers\OrderController::class,'update']);
Route::get('/deleteorderdetail/{$id}',[App\Http\Controllers\OrderController::class,'delete']);