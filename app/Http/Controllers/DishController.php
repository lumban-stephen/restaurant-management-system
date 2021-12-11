<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Dish;
use App\Models\Dish as ModelsDish;
use App\Models\Inventory;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class DishController extends Controller
{
    //
    public function index() {

        return ModelsDish::all();
    }

    public function show($id) {
        return ModelsDish::find($id);
    }

    public function store(Request $request) {
        return ModelsDish::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $dish = ModelsDish::findOrFail($id);
        $dish->update($request->all());
        return $dish;
    }

    public function delete( Request $request, $id)
    {
        $dish = ModelsDish::findOrFail($id);
        $dish->delete();
        return 204;
    }
}
