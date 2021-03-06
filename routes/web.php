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
    return Inertia::render('Pos');
})->name('pos');

//return inventory info
Route::get('/inventory',[App\Http\Controllers\InventoryController::class,'inventoryIndex']);

//return logged in user info
Route::get('/userinfo',[App\Http\Controllers\ProfileController::class,'userProfile']);

//return all users info
Route::get('/empinfo',[App\Http\Controllers\EmployeeController::class,'empInfo']);
//update user info
Route::post('/updateAccount',[App\Http\Controllers\ProfileController::class,'userUpdate']);

//update employee info
Route::post('/updateEmp',[App\Http\Controllers\EmployeeController::class,'updateEmp']);
//delete employee info
Route::post('/deleteEmp',[App\Http\Controllers\EmployeeController::class,'deleteEmp']);
//add new employee info
Route::post('/addNewEmp',[App\Http\Controllers\EmployeeController::class,'store']);

//return all dish table info
Route::get('/dishindex',[App\Http\Controllers\DishController::class,'dishIndex']);

//return all dish ingredients info
Route::get('/dishingredientindex',[App\Http\Controllers\DishIngredientController::class,'dishIngredientIndex']);

//return all bill info
Route::get('/bill',[App\Http\Controllers\BillController::class,'billIndex']);

//return all order info
Route::get('/order',[App\Http\Controllers\OrderController::class,'orderIndex']);

//return all order info
Route::get('/orderDetail',[App\Http\Controllers\OrderController::class,'orderDetailIndex']);

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


//add dish to database
Route::post('/adddishes',[App\Http\Controllers\DishController::class,'store']);
//update ingredient to database
Route::post('/adddnewIng',[App\Http\Controllers\DishIngredientController::class,'store']);
//delete dish to database
Route::post('/deletedishes',[App\Http\Controllers\DishController::class,'delete']);
//delete dish to database
Route::post('/updatedishes',[App\Http\Controllers\DishController::class,'update']);

//add new order to database
Route::post('/addOrderInfo',[App\Http\Controllers\OrderController::class,'store']);
//add new dish order to database
Route::post('/adddNewDish',[App\Http\Controllers\OrderController::class,'storeNewDish']);
//update new dish to database
Route::post('/adddNewDishUpdate',[App\Http\Controllers\OrderController::class,'updateNewDish']);
//update new order to database
Route::post('/updateOrder',[App\Http\Controllers\OrderController::class,'updateOrder']);
//delete order to database
Route::post('/deleteOrder',[App\Http\Controllers\OrderController::class,'delete']);