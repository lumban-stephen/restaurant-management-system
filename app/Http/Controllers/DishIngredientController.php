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

}
