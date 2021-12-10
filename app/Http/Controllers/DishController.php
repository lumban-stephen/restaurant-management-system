<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DishController extends Controller
{
    //
    public function dishIndex() {
        
        $dishes = DB::table('dishes')->get();

        return $dishes;
    }

    public function dishAdd( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("INSERT INTO `DISHES` (dish_name, price) VALUES ($dish, $price)",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Added Successfully');
    }

    public function dishUpdate( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("UPDATE `DISHES` SET dish_name = $dish, price = $price WHERE id = $request->input('id');",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Updated Successfully');
    }

    public function dishDelete( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("DELETE FROM `DISHES` WHERE id = $request->input('id');",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Added Successfully');
    }
}
