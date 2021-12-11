<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DishController extends Controller
{
    //
    public function index() {
        
        $dishes = DB::table('dishes')->get();

        return $dishes;
    }

    public function store(Request $request) {
        DB::table('dishes')->insert([
            'dish_name' => $request->input('dish_name'),
            'price' => $request->input('price')
        ]);
    }

    public function update(Request $request)
    {
        
        $dish_name = $request->input('dish_name');
        $price = $request->input('price');

        DB::update('update users set dish_name = ?,price=?',[$dish_name,$price]);
        return redirect()->back()->with('status','Dish Updated Successfully');
    }
}
