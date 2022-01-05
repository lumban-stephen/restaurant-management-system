<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderDetailsController extends Controller
{
    //
    public function index(){
        $orderDetails = DB::table('order_details')->get();
        return $orderDetails;
    }

    public function store( Request $request)
    {
        DB::insert('insert into order_details (date, status, receiver, location, payment) values (?, ?, ?, ?, ?)', 
        [
            $request->input('date'), $request->input('status'), $request->input('receiver'), 
            $request->input('location'), $request->input('payment')
        ]);
    }

    public function update( Request $request, $id)
    {
        $date = $request->input('date');
        $status = $request->input('status');
        $receiver = $request->input('receiver');
        $location = $request->input('location');
        $payment = $request->input('payment');


        DB::update('update order_details set date = ?,status=?,receiver=?, location=?, payment=? where id = ?',[$date, $status, $receiver, $location, $payment, $id]);
    }

    public function delete( $id )
    {
        DB::delete('delete from order_details where id=?',[$id]);
    }
}
