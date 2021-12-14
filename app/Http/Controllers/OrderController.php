<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function index(){
        $orders = DB::table('orders')->get();
        return $orders;
    }

    public function store( Request $request)
    {
        DB::insert('insert into orders (user_id, unit, quantity) values (?, ?,?)', 
        [$request->input('food_name'), $request->input('unit'),$request->input('quantity')]);
    }

    public function update( Request $request, $id)
    {
        $name = $request->input('food_name');
        $unit = $request->input('unit');
        $quantity = $request->input('quantity');
        $restocked_date = $request->input('restocked_date');
        $expiry_date = $request->input('expiry_date');


        DB::update('update orders set food_name = ?,unit=?,quantity=?, restocked_date=?, expiry_date=? where id = ?',[$name, $unit, $quantity, $restocked_date, $expiry_date, $id]);
    }

    public function delete( $id )
    {
        DB::delete('delete from orders where id=?',[$id]);
    }
}
