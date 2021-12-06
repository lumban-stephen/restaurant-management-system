<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    //
    public function inventoryIndex() {
        $ingredients = DB::table('inventories')->get();

        return $ingredients;
    }
}
