<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DishController extends Controller
{
    //
    public function dishIndex() {
        
        $dishes = DB::table('dishes')->get();

        return $dishes;
    }
}
