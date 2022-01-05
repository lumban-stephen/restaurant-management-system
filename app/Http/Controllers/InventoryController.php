<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Inertia\Inertia;
use Carbon\Carbon;

class InventoryController extends Controller
{
    //
    public function inventoryIndex() {
        
        $ingredients = DB::table('inventories')->get();

        return $ingredients;
    }

    public function store( Request $request)
    {
        $date = Carbon::now();
        $expire = Carbon::now()->addDays(7);

        DB::insert('insert into inventories (food_name, unit, quantity,restocked_date,expiry_date) values (?, ?,?,?,?)', [$request->input('food_name'), $request->input('unit'),$request->input('quantity'),$date->toDateString(),$expire->toDateString()]);

    }

    public function update( Request $request)
    {
        
        $id = $request->input('id');
        $name = $request->input('food_name');
        $unit = $request->input('unit');
        $quantity = $request->input('quantity');
        $restocked_date = $request->input('restocked_date');
        $expiry_date = $request->input('expiry_date');


        DB::update('update inventories set food_name = ?,unit=?,quantity=?, restocked_date=?, expiry_date=? where id = ?',[$name,$unit,$quantity,$restocked_date,$expiry_date,$id]);
    }

    public function delete( Request $request)
    {
        
        $id = $request->input('id');

        DB::delete('delete from inventories where id=?',[$id]);
    }

}
