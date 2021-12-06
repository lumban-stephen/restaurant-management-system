import React, { useState, useEffect } from 'react';
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ingredients = () =>{
  //fetching data from database. Data is stored in "users" as array
  const[ingredients, setingredients]=useState([]);
  useEffect(()=>{
    fetch('/inventoryIndex')
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
              <td> { v.inventory_id } </td>
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
                <td>{selectedData?.inventory_id}</td>
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
          <Button variant="primary" onClick={viewClose}>
            Save Changes
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
                <td>{selectedData?.food_name}</td>
                <input type="text" id ="name-update" defaultValue={selectedData?.food_name} name="ingredient"/>
                <td>{selectedData?.quantity}</td>
                <input type="text" id ="qty-update" defaultValue={selectedData?.quantity} name="qty"/>
                <td>{selectedData?.restocked_date}</td>
                <input type="date" id ="restock-update" defaultValue={selectedData?.restocked_date} name="r-date"/>
                <td>{selectedData?.expiry_date}</td>
                <input type="date" id ="expiry-update" defaultValue={selectedData?.expiry_date} name="x-date"/>
              </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for Update ends here */} 

      {/*  pop up modal for Delete starts here */} 
      <div>
      <Modal show={del} onHide={delClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Ingredient</th>
              </tr>
              <tr>
                <td>{selectedData?.inventory_id}</td>
                <td>{selectedData?.food_name}</td>
                
              </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={delClose}>
            Close
          </Button>
          <Button variant="primary" onClick={delClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for Delete ends here */} 

      {/*  pop up modal for add employee starts here */} 
      <div>
      <Modal show={addem} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Ingredient</th>
            <th scope="col">Unit</th>
            <th scope="col">Quantity</th>
        </tr>
        <tr>
            <td>{selectedData?.food_name}</td>
            <input type="text" id ="name-add" defaultValue={selectedData?.food_name} name="ingredient"/>
            <td>{selectedData?.quantity}</td>
            <input type="text" id ="qty-add" defaultValue={selectedData?.quantity} name="qty"/>
        </tr>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for add employee ends here */} 

    </>
  );

}

export default Inventory;
