<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class InventoryController extends Controller
{
    
    public function new_inventory()
    {
        $dish = DB::select('select * from dish');
        
        return view('inventory.create_inventory',['dish'=>$dish]);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $expire = Carbon::now()->addDays(7);
    
        DB::insert('insert into ingredient (food_name) values (?)', [$request->input('name')]);
        $id = DB::getPdo()->lastInsertId();
        
        DB::insert('insert into inventory (unit, quantity, restocked_date, expiry_date,ingredient_id) values (?, ?, ?, ?, ?)', [$request->input('unit'), $request->input('qty'), $date->toDateString(),$expire->toDateString(),$id]);

        return redirect()->back()->with('status','Inventory Updated Successfully');
    }

    public function show()
    {
        $inventory = DB::table('inventory')->join('ingredient','inventory.ingredient_id','=','ingredient.ingredient_id')->select('inventory.*','ingredient.*')->get();

        $date = Carbon::now();
        $today=$date->toDateString();
        return view('inventory.inventory',['inventory'=>$inventory,'today'=>$today]);
    }

    public function update_view($id)
    {    
        $inventory = DB::select('select * from inventory where inventory_id=?',[$id]);
        $dish = DB::select('select * from dish');
        return view('inventory.update_inventory',['inventory'=>$inventory,'dish'=>$dish]);
    }

    public function update(Request $request, $id)
    {
        DB::update('update inventory set food_name=?, unit=?, quantity=?, portion_size=?, expiry_date=?, dish_id=?  where inventory_id =?',[ $request->input('name'), $request->input('unit'), $request->input('qty'), $request->input('psize'), $request->input('eday'), $request->input('dish'),$id]);
        return redirect()->back()->with('success','Inventory Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::delete('delete from inventory where inventory_id=?',[$id]);
        return redirect()->back()->with('success','Inventory Deleted Successfully');
    }
}
