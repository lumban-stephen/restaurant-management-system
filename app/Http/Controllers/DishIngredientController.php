<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DishIngredientController extends Controller
{
    //
    public function dishIngredientIndex() {
        
        $dishIngredient = DB::table('dish_ingredients')->get();

        return $dishIngredient;
    }

    public function store( Request $request)
    {
        DB::insert('insert into dish_ingredients (dish_id, ingredient_id) values (?, ?)', [$request->input('dish_id'), $request->input('inventory_id')]);
    }
}
