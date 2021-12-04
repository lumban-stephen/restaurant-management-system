import {useState,useEffect} from "react";

const Inputprofile = () =>{
    
    return(
        <form action="#" method="POST" enctype="multipart/form-data">
    
        <label for="picture"><strong>Picture:</strong></label>
        <img src="/image/{{ $user->file_path }}" width="100px" />
        <input type="file" name="picture" id="picture" />
        <br /><label for="name"><strong>Name:</strong></label>
        <input type="text" class="form-control" id ="name" name="name" />
        
        <br />
        <label for="email"><strong>Email:</strong></label>
        <input type="text" class="form-control" id ="email" name="email" />
        <br /><strong>Salary:  </strong>
        <br /><strong>Role: Add data from database</strong>    
        <button class="btn btn-primary" type="submit">Update Profile</button>
        </form>
      

    )


}


export default Inputprofile;
