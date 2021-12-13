<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderRecordController extends Controller
{
    public function index(){
        $record = DB::table('pos')->get();
        return $record;
    }
}
