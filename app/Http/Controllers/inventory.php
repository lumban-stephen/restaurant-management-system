<?php

namespace App\Http\Controllers;
use App\Models\InventoryModel;
use Illuminate\Http\Request;

class inventory extends Controller
{
    //

    public function index() {
        $data = InventoryModel::all(); //Retrieves all data from the inventory model
        return $data; //return statement
    }

    public function create() {
        
    }

    public function store(Request $request) {
        $data = new InventoryModel();
        $data->Ingredient = $request->Ingredient;
    }

    public function show($id) {

    }

    public function edit($id) {
        $data = InventoryModel::find($id);
        return $data;
    }

    public function update(Request $request, $id) {

    }

    public function destroy($id) {
        $data = InventoryModel::find($id);
        $data->delete();
    }
}
