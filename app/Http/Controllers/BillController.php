<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BillController extends Controller
{
    //
    public function billIndex() {
        
        $bill = DB::table('bill')->get();

        return $bill;
    }

    public function store( Request $request)
    {
        DB::insert('insert into dishes (dish_name, price) values (?, ?)', [$request->input('dish_name'), $request->input('price')]);
    }

    public function delete( Request $request)
    {
        
        $id = $request->input('id');

        DB::delete('delete from dishes where id=?',[$id]);
    }

    public function update( Request $request)
    {
        DB::update('update dishes set dish_name = ?,price = ? where id = ?',[$request->input('dish_name'),$request->input('price'),$request->input('id')]);
    }
}
