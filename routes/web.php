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

Route::get('/dish', function () {
    return Inertia::render('DishManagement');
})->name('dish');

require __DIR__.'/auth.php';

Route::get('/orders', function () {
    return view('Ordermanagement');
});

Route::get('/pos', function () {
    return view('ordermanagement');
});

//return inventory info
Route::get('/inventory',[App\Http\Controllers\InventoryController::class,'inventoryIndex']);

//return logged in user info
Route::get('/userinfo',[App\Http\Controllers\ProfileController::class,'userProfile']);

//return all users info
Route::get('/empinfo',[App\Http\Controllers\EmployeeController::class,'empInfo']);

//return all dish table info
Route::get('/dishindex',[App\Http\Controllers\DishController::class,'dishIndex']);

//return all dish ingredients info
Route::get('/dishingredientindex',[App\Http\Controllers\DishIngredientController::class,'dishIngredientIndex']);

//save dish info
Route::post('/dishsave',[App\Http\Controllers\DishController::class,'dishAdd']);

//update dish info
Route::post('/dishupdate',[App\Http\Controllers\DishController::class,'dishUpdate']);

//delete dish info
Route::post('/dishdel',[App\Http\Controllers\DishController::class,'dishDelete']);