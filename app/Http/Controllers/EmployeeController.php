<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    public function empInfo(){
        $users = DB::table('users')->get();
        return $users;
    }

    public function updateEmp( Request $request)
    {
        
        $id = $request->input('id');
        $name = $request->input('name');
        $email = $request->input('email');
        $role = $request->input('role');
        $salary = $request->input('salary');


        DB::update('update users set name = ?,email=?,role=?,salary=? where id = ?',[$name,$email,$role,$salary,$id]);
    }

    public function deleteEmp( Request $request)
    {
        
        $id = $request->input('id');

        DB::delete('delete from users where id=?',[$id]);
    }

    
    public function store( Request $request)
    {

        //$password = Hash::make($request->input('password'));
        DB::insert('insert into users (name, email, salary,role,password) values (?, ?,?,?,?)', [$request->input('name'), $request->input('email'),$request->input('salary'),$request->input('role'),'aaa']);

    }

}