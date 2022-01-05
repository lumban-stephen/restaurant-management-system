<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

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
    
        DB::update('update users set name = ?,email=? where id = ?',[$name,$email,auth()->user()->id]);

        
    }


}