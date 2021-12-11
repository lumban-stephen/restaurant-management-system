<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DishController extends Controller
{
    //
    public function index() {
        
        $dishes = Dish::all();
        return response()->json([
            'status' => 200,
            'dishes' => $dishes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'dish_name'=>'required|max:191',
            'price'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                //'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $dish = new Dish;
            $dish->dish_name = $request->input('dish_name');
            $dish->price = $request->input('price');
            $dish->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Dish Added Successfully',
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $dishes = Dish::find($id);
        if($dishes)
        {
            return response()->json([
                'status'=> 200,
                'dishes' => $dishes,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Dish ID Found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'dish_name'=>'required|max:191',
            'price'=>'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                //'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $dish = Dish::find($id);
            if($dish)
            {

                $dish->dish_name = $request->input('dish_name');
                $dish->price = $request->input('price');
                $dish->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Dish Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Dish ID Found',
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dish = Dish::find($id);
        if($dish)
        {
            $dish->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Dish Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Dish ID Found',
            ]);
        }
    }

    public function dishAdd( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("INSERT INTO `DISHES` (dish_name, price) VALUES ($dish, $price)",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Added Successfully');
    }

    public function dishUpdate( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("UPDATE `DISHES` SET dish_name = $dish, price = $price WHERE id = $request->input('id');",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Updated Successfully');
    }

    public function dishDelete( Request $request)
    {
        $dish = $request->input('dish_name');
        $price = $request->input('price');

        DB::update("DELETE FROM `DISHES` WHERE id = $request->input('id');",[$dish,$price,auth()->user()->id]);
        return redirect()->back()->with('status','Dish Added Successfully');
    }
}
