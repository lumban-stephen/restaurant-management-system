import {useState,useEffect} from "react";
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Inputprofile = () =>{
  let state1 = {
    id : 0,
    name : "users.name",
    email :" users.email",
  }
    const[users, setUsers]=useState({});
    const[state, setState]=useState(state1);
    
      useEffect(()=>{
        fetch('/userinfo')
        .then(response=>response.json())
        .then(response=>{
          console.log(response.name);
          setUsers(response)  
        })
        
      },[])

    //when you input data, it is changed
    const handleInput = (e) => {
      e.persist();
      const nm = e.target.name;
      console.log(nm)
      setState({...state, [nm]: e.target.value});
    }

    //when you click save changes, it is sent to database
    const saveStudent = async (e) => {
      e.preventDefault();
      console.log(state);
      const res = await axios.post('/updateAccount',state).then(res => console.log(res.data));

    }
    
    return(
        <form onSubmit={saveStudent} >
        <br /><label for="name"><strong>Name: </strong></label>
        
        <input type="text" class="form-control" id ="name-update" defaultValue={users.name} name="name" onChange={handleInput}/>
        <br />
        <label for="email"><strong>Email: </strong></label>
        <input type="text" class="form-control" id ="email" defaultValue={users.email} name="email" onChange={handleInput}/>
        <br /><strong>Salary:  {users.salary}</strong>
        <br /><strong>Role: {users.role}</strong>
        <br />    
        <Button variant="primary" type="submit">
            Save Changes
        </Button>
        </form>
      

    )


}


export default Inputprofile;