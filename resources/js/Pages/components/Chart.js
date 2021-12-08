import React, { useState, useEffect } from 'react';
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ingredients = () =>{
  //fetching data from database. Data is stored in "users" as array
  const[ingredients, setingredients]=useState([]);
  useEffect(()=>{
    fetch('/inventory')
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
      setingredients(response)  
    })
    
  },[])
    
    const [view, setView] = useState(false);//see details
    const [update, setUpdate] = useState(false);//update
    const [del, setDel] = useState(false);//delete
    const [addem, setAdd] = useState({});//add new ? 
    const [selectedData, setSelectedData] = useState({});//data in selected cell
    const [text, setText] = useState(0);
    const [data, setData] = useState(ingredients);

    const viewClose = () => setView(false);
   // const viewShow = () => setView(true);

    const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

    const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

    const addClose = () => setAdd(false);
    const addShow = () => setAdd(true);

  

  // when you click the button, data in the cell will be stored in setSelectedData   
  const hanldeClick1 = (selectedRec) => {
    setSelectedData(selectedRec);
    setView(true);
  };

  const hanldeClick2 = (selectedRec) => {
    setSelectedData(selectedRec);
    setUpdate(true);
  };

  const hanldeClick3 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDel(true);
  };

  //data is updated on front end
  const handleUpdate = () => {
    console.log(selectedData);
    const name = document.getElementById("name-update");
    const quantity = document.getElementById("qty-update");    
    const rdate = document.getElementById("restock-update");
    const edate = document.getElementById("expiry-update");
   
    selectedData.food_name = name.value;
    selectedData.quantity = quantity.value;
    selectedData.restocked_date = rdate.value;
    selectedData.expiry_date = edate.value;
    
    data.map((d)=>{
      d.inventory_id === selectedData.inventory_id
      ? { ...d, selectedData }
      : d
      
    })
    updateClose();
  }

  return (
      <p>Hello World!</p>
  );

}

export default Chart;
