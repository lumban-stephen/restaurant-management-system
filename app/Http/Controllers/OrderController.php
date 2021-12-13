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
}
