<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function orderIndex() {
        
        $order = DB::table('orders')->get();

        return $order;
    }

    public function orderDetailIndex() {
        
        $order_detail = DB::table('order_detail')->get();

        return $order_detail;
    }

    public function store( Request $request)
    {
        // DB::insert('insert into bill (total_bill) values (?)', [1]);
        // $bill_id = DB::getPdo()->lastInsertId();

        DB::insert('insert into orders (receiver,location,order_date,note,total_bill) values (?,?,?,?,?)', [$request->input('receiver'),$request->input('location'),$request->input('order_date'),$request->input('receiver'),$request->input('total')]);

        $order_id = DB::getPdo()->lastInsertId();

        DB::update('update order_detail set order_id = ? where order_id = ?',[$order_id,1]);

        

    }

    public function storeNewDish( Request $request)
    {
        DB::insert('insert into order_detail (dish_id, quantity,order_id,dish_name) values (?,?,?,?)', [$request->input('id'),$request->input('quantity'),1,$request->input('dish_name')]);

    }

    public function updateNewDish( Request $request)
    {
        DB::insert('insert into order_detail (dish_id, quantity,order_id,dish_name) values (?,?,?,?)', [$request->input('id'),$request->input('quantity'),2,$request->input('dish_name')]);

    }

    public function updateOrder( Request $request)
    {
        DB::update('update orders set receiver = ?,location = ?,order_date = ?,note = ? where order_id = ?',[$request->input('receiver'),$request->input('location'),$request->input('order_date'),$request->input('note'),$request->input('order_id')]);

        DB::update('update order_detail set order_id = ? where order_id = ?',[$request->input('order_id'),2]);
    }

    public function delete( Request $request)
    {
        
        DB::delete('delete from order_detail where id=?',[$request->input('order_id')]);
    }



    
}
