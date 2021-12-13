import React, { useState, useEffect } from 'react';
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


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
    const [showAdd, setShowadd] = useState(false);//delete

    const viewClose = () => setView(false);
   // const viewShow = () => setView(true);

    const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

    const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

    const addClose = () => setShowadd(false);
    const addShow = () => setShowadd(true);

  

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
    const unit = document.getElementById("unit-update");
   
    selectedData.food_name = name.value;
    selectedData.quantity = quantity.value;
    selectedData.restocked_date = rdate.value;
    selectedData.expiry_date = edate.value;
    selectedData.unit = unit.value;
    
    data.map((d)=>{
      d.id === selectedData.id
      ? { ...d, selectedData }
      : d
      
    })
    updateClose();
  }

    //add new ingredients and send it to database
    const addNew = async (e) => {
      e.preventDefault();
      console.log(addem);
      const res = await axios.post('/addIngredients',addem).then(res => console.log(res.data).catch(function(error) {
      console.log(error);
    })
    );
  
    }

      //when you click save changes, it is sent to database
  const saveUpdate = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/updateIngredients',selectedData).then(res => console.log(res.data)
    .catch(function(error) {
      console.log(error);
    })
    );

  }

      //when you click save changes, it is sent to database
  const deleteIng = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/deleteIngredients',selectedData).then(res => console.log(res.data));

  }

  //data is deleted on front end
  const handleDelete = (id) => {
    const newList = ingredients.filter((item) => item.id !== id);

    setingredients(newList);

    delClose();
  }

    //add new ingredients to an array ( front end)
    const addNewIng=()=>{
      setingredients([...ingredients,
      addem])
    }

    //input data in add new ingredient (object)
    const handleInput = (e) => {
    e.persist();
    const nm = e.target.name;
    console.log(nm)
    setAdd({...addem, [nm]: e.target.value});
  }

  return (
    <>
    <Button variant="primary" onClick={addShow}>Add New Ingredient</Button>
    <div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Ingredient</th>
      <th>Unit</th>
      <th>Quantity</th>
      <th>Restock Date</th>
      <th>Expiry Date</th>
    </tr>
  </thead>
  <tbody>
    {ingredients.map((v) => (
            <tr>
              <td> { v.id } </td>
              <td> { v.food_name } </td>
              <td> { v.unit } </td>
              <td> { v.quantity } </td>
              <td> { v.restocked_date } </td>
              <td> { v.expiry_date } </td>
              <td>  <Button variant="success" onClick={() => hanldeClick1(v)}>View</Button>
                    <Button variant="warning" onClick={() => hanldeClick2(v)}>Update</Button>
                    <Button variant="danger" onClick={() => hanldeClick3(v)}>Delete</Button>
              </td>
            </tr>
          ))}
  </tbody>
</Table>
    </div>

    
    {/*  pop up modal for view starts here */}
    <div>
      <Modal show={view} onHide={viewClose}>
        <Modal.Header closeButton>
          <Modal.Title>See Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Ingredient</th>
                <th scope="col">Unit</th>
                <th scope="col">Quantity</th>
                <th scope="col">Restock Date</th>
                <th scope="col">Expiry Date</th>
              </tr>
              <tr>
                <td>{selectedData?.id}</td>
                <td>{selectedData?.food_name}</td>
                <td>{selectedData?.unit}</td>
                <td>{selectedData?.quantity}</td>
                <td>{selectedData?.restocked_date}</td>
                <td>{selectedData?.expiry_date}</td>
              </tr>
          </table>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={viewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for view ends here */}

      {/*  pop up modal for Update starts here */}  
      <div>
      <Modal show={update} onHide={updateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <form onSubmit={saveUpdate} >
        <Modal.Body>
        <strong>Id:  {selectedData?.id}</strong>
        <br />
        
        <strong>Ingredient:  </strong>
        <input type="text" id ="name-update" defaultValue={selectedData?.food_name} name="food_name"/>
        <br />

        <strong>Unit:  </strong>
        <select defaultValue={selectedData?.role} name="unit" id ="unit-update">
        <option>Open this select menu</option>
          <option value="grams">grams</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="l">l</option>
        </select>
        <br />

        <strong>Quantity:  </strong>
        <input type="number" id ="qty-update" defaultValue={selectedData?.quantity} name="quantity"/>

        <br />
        <strong>Restock Date:  {selectedData?.restocked_date}</strong>
        <input type="date" id ="restock-update" defaultValue={selectedData?.restocked_date} name="restocked_date"/>

        <br />
        <strong>Expiry Date:  {selectedData?.expiry_date}</strong>
        <input type="date" id ="expiry-update" defaultValue={selectedData?.expiry_date} name="expiry_date"/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}   type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for Update ends here */} 

      {/*  pop up modal for Delete starts here */} 
      <div>
      <Modal show={del} onHide={delClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <form onSubmit={deleteIng} >
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Ingredient</th>
              </tr>
              <tr>
                <td>{selectedData?.id}</td>
                <td>{selectedData?.food_name}</td>
                
              </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={delClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(selectedData.id)} type="submit">
            Delete
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for Delete ends here */} 

      {/*  pop up modal for add ingredients starts here */} 
      <div>
      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Ingredient</Modal.Title>
        </Modal.Header>
        <form onSubmit={addNew} >
        <Modal.Body>
        <strong>Ingredient:  </strong>
        <input type="text" id ="name-add" defaultValue={selectedData?.food_name} name="food_name"  onChange={handleInput}/>
        <br />

        <strong>Unit:  </strong>
        <select  name="unit" id ="unit" onChange={handleInput}>
          <option>Open this select menu</option>
          <option value="grams">grams</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="l">l</option>
          </select>
        <br />

        <strong>Quantity:  </strong>
        <input type="number" id ="qty-add" defaultValue={selectedData?.quantity} name="quantity"  onChange={handleInput}/>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewIng} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for add employee ends here */} 

    </>
  );

}

export default Ingredients;
