<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\Controller;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::insert('insert into dish (dish_name, price) values (?, ?)', [$request->input('name'), $request->input('price')]);
        return redirect()->back()->with('status','Dish Updated Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $dish = DB::select('select * from dish');
        return view('dish.dish',['dish'=>$dish]);
    }

    public function new_dish()
    {
        return view('dish.create_dish');
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_view($id)
    {
        $dish = DB::select('select * from dish where dish_id=?',[$id]);
        return view('dish.update_dish',['dish'=>$dish]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::update('update dish set dish_name=?, price=? where dish_id =?',[$request->input('name'),$request->input('price'),$id]);
        return redirect()->back()->with('success','Dish Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::delete('delete from dish where dish_id=?',[$id]);
        return redirect()->back()->with('success','Dish Deleted Successfully');
    }
}
