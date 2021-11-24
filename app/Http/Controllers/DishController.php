<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\Controller;

class DishController extends Controller
{

    public function store(Request $request)
    {
        DB::insert('insert into dish (dish_name, price) values (?, ?)', [$request->input('name'), $request->input('price')]);
        return redirect()->back()->with('status','Dish Updated Successfully');
    }


    
    public function show()
    {
        $dish = DB::select('select * from dish');
        return view('dish.dish',['dish'=>$dish]);
    }

    public function new_dish()
    {
        return view('dish.create_dish');
    }

    public function update_view($id)
    {
        $dish = DB::select('select * from dish where dish_id=?',[$id]);
        return view('dish.update_dish',['dish'=>$dish]);
    }

    public function update(Request $request, $id)
    {
        DB::update('update dish set dish_name=?, price=? where dish_id =?',[$request->input('name'),$request->input('price'),$id]);
        return redirect()->back()->with('success','Dish Updated Successfully');
    }

    public function destroy($id)
    {
        DB::delete('delete from dish where dish_id=?',[$id]);
        return redirect()->back()->with('success','Dish Deleted Successfully');
    }
}
