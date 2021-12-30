import React, { useState, useEffect } from 'react';
import { Table,Button, Modal,Row,Col } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dishes = () =>{
  //fetching data from database. Data is stored in "users" as array
  const[dishes, setDishes]=useState([]);
  useEffect(()=>{
    fetch('/dishindex')
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
      setDishes(response)  
    })
  },[])

      //fetching data from database. Data is stored in "users" as array
      const[dishIng, setDishIng]=useState([]);
      useEffect(()=>{
        fetch('/dishingredientindex')
        .then(response=>response.json())
        .then(response=>{
          console.log(response);
          setDishIng(response)  
        })
        
      },[])


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
    const [selectedIng, setSelectedIng] = useState([]);//data in selected cell
    const [text, setText] = useState(0);
    const [data, setData] = useState(dishes);
    const [showAdd, setShowadd] = useState(false);
    const [popIng, setShowIng] = useState(false);
    const [showIngList, setshowIngList] = useState(false);
    const [addIng, setaddIng] = useState({});//add new ingredients 
    const [showIngListNoBT, setshowIngListNoBT] = useState(false);
    
    const viewClose = () => setView(false);
   // const viewShow = () => setView(true);

    const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

    const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

    const addClose = () => setShowadd(false);
    const addShow = () => setShowadd(true);

    const IngClose = () => setShowIng(false);
   
    const ShowIngListClose = () => setshowIngList(false);
    const showIngListNoBTClose = () => setshowIngListNoBT(false);
  

  // when you click the button, data in the cell will be stored in setSelectedData   
  const hanldeClick1 = (selectedRec) => {
    setSelectedData(selectedRec);
    setView(true);
  };

  const hanldeClick2 = (selectedRec) => {
    setSelectedData(selectedRec);
    const ingID = dishIng.filter((item) => item.dish_id === selectedData.id);
    const tempArr = ingredients.filter(function(item){
      return ingID.filter(it => item.id == it.id)
  }
  )
  

    //setSelectedIng();

    setUpdate(true);
  };

  const hanldeClick3 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDel(true);
  };

  const hanldeClickAddIng = (selectedRec) => {
    setSelectedData(selectedRec);
    setShowIng(true);
  };

  const showIngredients = () => {
    
    setshowIngList(true);
  };

    const showIngredientsNoButton = () => {
    
      setshowIngListNoBT(true);
  };

  //data is updated on front end
  const handleUpdate = () => {
    console.log(selectedData);
    const name = document.getElementById("name-update");
    const price = document.getElementById("price-update");    
   
    selectedData.dish_name = name.value;
    selectedData.price = price.value;
    
    data.map((d)=>{
      d.id === selectedData.id
      ? { ...d, selectedData }
      : d
      
    })
    updateClose();
  }

    //add new dishes and send it to database
    const addNew = async (e) => {
      e.preventDefault();
      console.log(addem);
      const res = await axios.post('/adddishes',addem).then(res => console.log(res.data));
  
    }

      //when you click save changes, it is sent to database
  const saveUpdate = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/updatedishes',selectedData).then(res => console.log(res.data));

  }

      //when you click save changes, it is sent to database
  const deleteIng = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/deletedishes',selectedData).then(res => console.log(res.data));

  }

     //add new ingredients to dishes and send it to database
    const saveNewIng = async (e) => {
      e.preventDefault();
      const dish_id = document.getElementById("dish_id");
      const inventory_id = document.getElementById("inventory_id");
      
      addIng.dish_id = dish_id.value;
      addIng.inventory_id = inventory_id.value;

      
      console.log(addIng);
      const res = await axios.post('/adddnewIng',addIng).then(res => console.log(res.data));
  
    }

  //data is deleted on front end
  const handleDelete = (id) => {
    const newList = dishes.filter((item) => item.id !== id);

    setDishes(newList);

    delClose();
  }

    //data is deleted on front end
    const handleRemoveIng = (id) => {
      const newList = selectedIng.filter((item) => item.id !== id);
  
      setSelectedIng(newList);
  
      delClose();
    }

    //add new dishes to an array ( front end)
    const addNewIng=()=>{
      setDishes([...dishes,
      addem])
    }

    //add new ingredients to an array ( front end)
    const addNewIngList=(v)=>{
      setSelectedIng([...selectedIng,
        v])
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
    <Button variant="primary" onClick={addShow}>Add New Dish</Button>
    <div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Dish Name</th>
      <th>Price</th>
      <th>Ingredients</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {dishes.map((v) => (
            <tr>
              <td> { v.dish_name } </td>
              <td> { v.price  } </td>
              <td> <Button variant="warning" onClick={() => showIngredientsNoButton(v)}>...</Button> </td>
              <td> 
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
        
        <strong>Dish:  </strong>
        <input type="text" id ="name-update" defaultValue={selectedData?.dish_name} name="dish_name"/>
        <br />

        <strong>Price:  </strong>
        <input type="number" id ="price-update" defaultValue={selectedData?.price} name="price"/>
        <br />
        
        <strong>Ingredients:  </strong>
        <tr>
              <td>Food name: spare rib </td>
              <td>Quantity: 11 </td>
              <td><Button variant="primary" onClick={() => handleRemoveIng(v.id)}>
            remove</Button></td>
        </tr>
        <tr>
              <td>Food name: coffee </td>
              <td>Quantity: 2 </td>
              <td><Button variant="primary" onClick={() => handleRemoveIng(v.id)}>
            remove</Button></td>
            </tr>
        {selectedIng.map((v) => (
            <tr>
              <td>Food name: { v.food_name } </td>
              <td>Quantity: { v.quantity  } </td>
              <td><Button variant="primary" onClick={() => handleRemoveIng(v.id)}>
            remove</Button></td>
            </tr>
          ))}
        <br />
        <Button variant="success" onClick={() => showIngredients()}>Add Ingredients</Button>

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
          <p>Are you sure you want to delete { selectedData?.dish_name }?</p>
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

      {/*  pop up modal for add dishes starts here */} 
      <div>
      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Dish</Modal.Title>
        </Modal.Header>
        <form onSubmit={addNew} >
        <Modal.Body>
        <strong>Dish:  </strong>
        <input type="text" id ="name-add" name="dish_name"  onChange={handleInput}/>
        <br />

        <strong>Price:  </strong>
        <input type="number" id ="name-add" name="price"  onChange={handleInput}/>
        <br />
        

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


      {/*  pop up modal for showing dishes starts here */} 
      <div>
      <Modal show={popIng} onHide={IngClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingredients</Modal.Title>
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
          <Button variant="secondary" onClick={IngClose}>
            Close
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for add employee ends here */}  

      {/*  pop up modal for adding ingredients starts here */} 
      <div>
      <Modal show={showIngList} onHide={ShowIngListClose}>
        <Modal.Header closeButton>
        <Modal.Title>Ingredients</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
      <Row>
        <Col>Ingredient</Col>
        <Col>Unit</Col>
        <Col>Quantity</Col>
        <Col>Action</Col>
      </Row>
      
      {ingredients.map((v) => (
        <form onSubmit={saveNewIng} >
            <Row>
              <Col> { v.food_name } </Col>
              <Col> { v.unit } </Col>
              <Col> { v.quantity } 
              <input type="hidden" id ="dish_id" defaultValue={selectedData?.id} name="dish_id"/>
              <input type="hidden" id ="inventory_id" defaultValue={v.id} name="inventory_id"/>
              </Col>
              
              <Col><Button variant="primary" onClick={() => addNewIngList(v)} type="submit">
              ADD
              </Button></Col>
              
            </Row>
            </form>
          ))}
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ShowIngListClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for adding ingredients ends here */}  

      {/*  pop up modal for showing only ingredients starts here */} 
      <div>
      <Modal show={showIngListNoBT} onHide={showIngListNoBTClose}>
        <Modal.Header closeButton>
        <Modal.Title>Ingredients</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
      <Row>
        <Col>Ingredient</Col>
        <Col>Unit</Col>
        <Col>Quantity</Col>
      </Row>
      
      {/* {ingredients.map((v) => (
            <Row>
              <Col> { v.food_name } </Col>
              <Col> { v.unit } </Col>
              <Col> { v.quantity } </Col>          
            </Row>          
          ))} */}
      
      <Row>
      <Col> spare rib </Col>
      <Col> pcs </Col>
      <Col> 11 </Col>         
      </Row>

      <Row>
      <Col> coffee </Col>
      <Col> kg </Col>
      <Col> 2 </Col>         
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showIngListNoBTClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for showing only ingredients ends here */}  

    </>
  );

}

export default Dishes;