import {useState,useEffect} from "react";

const Inputprofile = () =>{
    const[users, setUsers]=useState({});
      useEffect(()=>{
        fetch('/userinfo')
        .then(response=>response.json())
        .then(response=>{
          console.log(response.name);
          setUsers(response)  
        })
        
      },[])
    
    return(
        <form action="#" method="POST" enctype="multipart/form-data">
    <h1></h1>
        <label for="picture"><strong>Picture:</strong></label>
        <img src="/image/{{ $user->file_path }}" width="100px" />
        <input type="file" name="picture" id="picture" />
        <br /><label for="name"><strong>Name: {users.name} </strong></label>
        
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
