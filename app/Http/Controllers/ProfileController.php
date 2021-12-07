<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    public function userProfile(){
        $user = auth()->user();
        return $user;
    }

    public function userUpdate( Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');

        if ($image = $request->file('picture')) {
            $destinationPath = 'image/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $input['picture'] = "$profileImage";
            DB::update('update users set file_path=? where id = ?',[$input['picture'],auth()->user()->id]);
    
        }

        DB::update('update users set name = ?,email=? where id = ?',[$name,$email,auth()->user()->id]);
        return redirect()->back()->with('status','Student Updated Successfully');
    }


}