import React, { useState, useEffect } from 'react';
import { Table,Button, Modal, Row,Col } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const mystyle = {
  display: "flex",
};

const OrderManagement = () =>{
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
  const[order, setOrder]=useState([]);
  useEffect(()=>{
    fetch('/order')
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
      setOrder(response)  
    })
  },[])

  const[filterOrder, setfilterOrder]=useState([]);
  var A = order.filter((item) => item.status === 'preparing');
  var B = order.filter((item) => item.status === 'delivered');
  
    //fetching data from database. Data is stored in "users" as array
    const[orderDetail, setOrderDetail]=useState([]);
    useEffect(()=>{
      fetch('/orderDetail')
      .then(response=>response.json())
      .then(response=>{
        console.log(response);
        setOrderDetail(response)  
      })
    },[])
    let tempAddEm = {
      receiver :'',
      location :'',
      order_date :'',
      note :'',
      total :0,
    };
    const [view, setView] = useState(false);//see details
    const [update, setUpdate] = useState(false);//update
    const [del, setDel] = useState(false);//delete
    const [done, setDone] = useState(false);//delete
    const [addem, setAdd] = useState(tempAddEm);//add new ? 
    const [selectedData, setSelectedData] = useState({});//data in selected cell
    const [selectedIng, setSelectedIng] = useState([]);//data in selected cell
    const [text, setText] = useState(0);
    const [data, setData] = useState(dishes);
    const [showAdd, setShowadd] = useState(false);
    const [popIng, setShowIng] = useState(false);
    const [showIngList, setshowIngList] = useState(false);
    const [addIng, setaddIng] = useState({});//add new ingredients 
    const [showIngListNoBT, setshowIngListNoBT] = useState(false);
    const [tempDish, settempDish] = useState({});//temp dish to send to database
    const [selectedDish, setSelectedDish] = useState([]);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState([]);
    const [total, setTotal] = useState(0);

    const [showUpdateDish, setshowUpdateDish] = useState(false);
    
    const viewClose = () => setView(false);
   // const viewShow = () => setView(true);

    const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

    const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

  const doneClose = () => setDone(false);

    const addClose = () => setShowadd(false);
    const addShow = () => setShowadd(true);

    const IngClose = () => setShowIng(false);
   
    const ShowIngListClose = () => setshowIngList(false);

    const [newDish, setnewDish] = useState([]);

    const showIngListNoBTClose = () => setshowIngListNoBT(false);

    const showUpdateDishClose = () => setshowUpdateDish(false);
  
    
  

  // when you click the button, data in the cell will be stored in setSelectedData   
  const hanldeClick1 = (selectedRec) => {
    setSelectedData(selectedRec);
    const tempOderDetail = orderDetail.filter((item) => item.order_id === selectedData.order_id);

    setSelectedOrderDetail(tempOderDetail);
    setView(true);
  };

  const hanldeClick2 = (selectedRec) => {
    setSelectedData(selectedRec);
    
    const tempOderDetail = orderDetail.filter((item) => item.order_id === selectedData.order_id);

    setSelectedOrderDetail(tempOderDetail);
  

  setUpdate(true);
  };

  const hanldeClick3 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDel(true);
  };

  const hanldeClick4 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDone(true);
  };

  const hanldeClickAddIng = (selectedRec) => {
    setSelectedData(selectedRec);
    setShowIng(true);
  };

  const showIngredients = () => {
    
    setshowIngList(true);
  };

  const showIngredientsNoButton = (selectedRec) => {
    setSelectedData(selectedRec);
    

    const tempOderDetail = orderDetail.filter((item) => item.order_id === selectedData.order_id);

    setSelectedOrderDetail(tempOderDetail);
  
  console.log(selectedDish);
    setshowIngListNoBT(true);
  };

  const showDishes = () => {
    
    setshowUpdateDish(true);
  };

    //data is deleted on front end
    const handleRemoveDish = (v) => {
      var temp = selectedData.total_bill; 
      var A = dishes.filter((item) => item.id === v.dish_id);
      temp -= A[0].price;
      console.log(temp)
      
      setSelectedData({...selectedData, ['total_bill']: temp});

      const newList = selectedOrderDetail.filter((item) => item.id !== v.id);
  
      setSelectedOrderDetail(newList);
  
      delClose();
    } 

    const All = () => {
      setfilterOrder(order);
    };

    const Preparing = () => {

      setfilterOrder(A);
    }; 

    const Delivered = () => {
      setfilterOrder(B);
    }; 

  //data is updated on front end
  const handleUpdate = () => {
    console.log(selectedData);
    const receiver = document.getElementById("receiver-update");
    const order_date = document.getElementById("order_date-update");    
    const location = document.getElementById("location-update");
    const note = document.getElementById("note-update");
    const bill = document.getElementById("bill-update");
   
    selectedData.receiver = receiver.value;
    selectedData.order_date = order_date.value;
    selectedData.location = location.value;
    selectedData.note = note.value;
    selectedData.total_bill = bill.value;
    
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
      console.log(addem.receiver);
      console.log(addem.location);
      console.log(addem.order_date);
      console.log(addem.note);
      const res = await axios.post('/addOrderInfo',addem).then(res => console.log(res.data));
  
    }

      //when you click save changes, it is sent to database
  const saveUpdate = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/updateOrder',selectedData).then(res => console.log(res.data));

  }

      //when you click save changes, it is sent to database
  const deleteIng = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    const res = await axios.post('/deleteOrder',selectedData).then(res => console.log(res.data));

  }

     //add new ingredients to dishes and send it to database
    const saveNewIng = async (e) => {
      e.preventDefault();
      //const quantity = document.getElementById("quantity");
      //const dish_id = document.getElementById("dish_id");
      
      //addIng.dish_id = dish_id.value;
      //addIng.quantity = quantity.value;

      
      //console.log(addIng);
      const res = await axios.post('/adddNewDish',tempDish).then(res => console.log(res.data));
  
    }

  //data is deleted on front end
  const handleDelete = (id) => {
    const newList = order.filter((item) => item.order_id !== id);

    setOrder(newList);

    delClose();
  }

  //data is deleted on front end
  const handleDone = () => {
    selectedData.status = 'Done';

    doneClose();
  }

    //add new dishes to an array ( front end)
    const addNewOrders=()=>{
      addem.status = 'preparing';
      setOrder([...order,
      addem])
      addClose();
    }

    //add new dishes to an array ( front end)
    const addNewIng=()=>{
      setDishes([...dishes,
      addem])
    }

    //add new dishes to an array ( front end)
    const addNewIngList=(selectedRec)=>{
      console.log(selectedRec);
      settempDish({...tempDish, ...selectedRec});
      console.log(tempDish.dish_name)

      setSelectedIng([...selectedIng,
        tempDish])

      
      // temp = tempDish.price*tempDish.quantity;
        // setNumber1(tempDish.price*tempDish.quantity);
        // setNumber2(total);

        // console.log(temp)
        var temp = total; 
      temp += selectedRec.price;
        setTotal(temp);
        
        setAdd({...addem, ['total']: temp});
        console.log(addem);
    }

    //input data in add new dish (object)
    const handleInputDish = (e) => {
    e.persist();
    const nm = e.target.name;
    console.log(nm)
    settempDish({...tempDish, [nm]: e.target.value});
  }

    //input data in add new ingredient (object)
    const handleInput = (e) => {
    e.persist();
    const nm = e.target.name;
    console.log(nm)
    setAdd({...addem, [nm]: e.target.value});
  }

    //add new dishes to an update array ( front end)
    const addNewDish=(selectedRec)=>{

      settempDish({...tempDish, ...selectedRec});

      setSelectedOrderDetail([...selectedOrderDetail,
        tempDish])
      
        var temp = selectedData.total_bill; 
        temp += selectedRec.price;
        setSelectedData({...selectedData, ['total_bill']: temp});
        console.log(selectedData.total_bill)
    }  

    const saveNewDish = async (e) => {
      e.preventDefault();
      //const quantity = document.getElementById("quantity");
      //const dish_id = document.getElementById("dish_id");
      
      //addIng.dish_id = dish_id.value;
      //addIng.quantity = quantity.value;

      
      //console.log(addIng);
      const res = await axios.post('/adddNewDishUpdate',tempDish).then(res => console.log(res.data));
  
    }    
  

  return (
    <>
    <Button variant="primary" onClick={addShow}>Add New Order</Button>{'  '}
    <Button variant="warning" onClick={All}>All</Button>{'  '}
    <Button variant="success" onClick={Preparing}>Preparing</Button>{'  '}
    <Button variant="info" onClick={Delivered}>Delivered</Button>
    <div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Receiver</th>
      <th>Delivery Date</th>
      <th>Dishes</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filterOrder.map((v) => (
            <tr>
              <td> { v.receiver } </td>
              <td> { v.order_date  } </td>
              <td> <Button variant="warning" onClick={() => showIngredientsNoButton(v)}>...</Button> </td>
              <td>{ v.status } </td>
              <td> <Button variant="success" onClick={() => hanldeClick1(v)}>View</Button>
              {' '}<Button variant="warning" onClick={() => hanldeClick2(v)}>Update</Button>
              {' '} <Button variant="info" onClick={() => hanldeClick4(v)}>Done</Button>
              {' '} <Button variant="danger" onClick={() => hanldeClick3(v)}>Delete</Button>
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

        <strong>Id:  {selectedData?.order_id}</strong>
        <br />
        <strong>Receiver:  {selectedData?.receiver}</strong>
        <br />
        <strong>Delivery date:  {selectedData?.order_date}</strong>
        <br />
        <strong>Location:  {selectedData?.location}</strong>
        <br />
        <strong>Note: <br /> {selectedData?.note}</strong>
        <br />
        <strong>Total Bill:  {selectedData?.total_bill}</strong>
        <br />
        <strong>Dishes:  </strong>
        <br />
        {selectedOrderDetail.map((v) => (
            <p>
            Dish: { v.dish_name } 
            {'  '}Quantity: { v.quantity }   
            </p>     
          ))}


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
        
        <strong>Receiver:  </strong>
        <input type="text" id ="receiver-update" defaultValue={selectedData?.receiver} name="receiver"/>
        <br />

        <strong>Delevery date:  </strong>
        <input type="date" id ="order_date-update" defaultValue={selectedData?.order_date} name="order_date"/>
        <br />

        <strong>Location:  </strong>
        <input type="text" id ="location-update" defaultValue={selectedData?.location} name="location"/>
        <br />
        
        <strong>Note:  </strong><br />
        <textarea  name="note" id ="note-update" defaultValue={selectedData?.note} />
        <br />

        <strong>Total Bill:  {selectedData?.total_bill}</strong><br />
        
        <br />

        <strong>Dish:  </strong>
        {selectedOrderDetail.map((v) => (
            <p>
            Dish: { v.dish_name } {'  '}
            Quantity: { v.quantity }  {'  '}
            <Button variant="primary" onClick={() => handleRemoveDish(v)}>remove</Button>    
            </p>
          ))}
        <br />
        <Button variant="success" onClick={() => showDishes()}>Add New Dish</Button>

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
          <p>Are you sure you want to delete { selectedData?.receiver }?</p>
        </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={delClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(selectedData.order_id)} type="submit">
            Delete
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for Delete ends here */} 

      {/*  pop up modal for done starts here */} 
      <div>
      <Modal show={done} onHide={doneClose}>
        <Modal.Header closeButton>
          <Modal.Title>Done</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <table class="table">
          <p>Is { selectedData?.receiver }'s order done?</p>
        </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doneClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDone()} type="submit">
            Done
          </Button>
        </Modal.Footer>
        
      </Modal>
      </div>
      {/*  pop up modal for done ends here */} 

      {/*  pop up modal for add orders starts here */} 
      <div>
      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Order</Modal.Title>
        </Modal.Header>
        <form onSubmit={addNew} >
        <Modal.Body>
        <strong>Receiver:  </strong>
        <input type="text" id ="name-add" name="receiver"  onChange={handleInput}/>
        <br />

        <strong>Address:  </strong>
        <input type="text" id ="name-add" name="location"  onChange={handleInput}/>
        <br />

        <strong>Date:  </strong>
        <input type="date" id ="name-add" name="order_date"  onChange={handleInput}/>
        <br />

        <strong>Note:  </strong>
        <textarea  name="note"  onChange={handleInput}/>
        <br />

        <strong>Total bill:  </strong>
        { total }
        <br />
      

        <strong>Dish:  </strong>
        {selectedIng.map((v) => (
            <p>
              Food name: { v.dish_name } {'  '}
              Quantity: { v.quantity  } 
            </p>
          ))}
        <br />

        <Button variant="success" onClick={() => showIngredients()}>Add Dish</Button>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewOrders} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      {/*  pop up modal for add orders ends here */}


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

      {/*  pop up modal for adding dishes to order starts here */} 
      <div>
      <Modal show={showIngList} onHide={ShowIngListClose}>
        <Modal.Header closeButton>
        <Modal.Title>Dishes</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
      <Row>
        <Col>Dish</Col>
        <Col>{'     '}</Col>
        <Col>Price</Col>
        <Col>{'     '}</Col>
        <Col>Quantity</Col>
        <Col>{'     '}</Col>
        <Col>Action</Col>
      </Row>
      
      {dishes.map((v) => (
        

        <form onSubmit={saveNewIng} >
            <Row>
              <Col> { v.dish_name } </Col>
              <Col> { v.price } </Col>
              <Col> <input type="number" id ="quantity" name="quantity" onChange={handleInputDish} style={{width: '70%'}}/>  
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
      {/*  pop up modal for aadding dishes to orders ends here */}  

{/*  pop up modal for showing only dishes starts here */} 

      <Modal show={showIngListNoBT} onHide={showIngListNoBTClose}>
        <Modal.Header closeButton>
        <Modal.Title>Dish</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
      <Row>
        <Col>Dish</Col>
        <Col>Quantity</Col>
      </Row>
      
      {selectedOrderDetail.map((v) => (
            <Row>
              <Col> { v.dish_name } </Col> 
              <Col> { v.quantity } </Col> 
            </Row>          
          ))}
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showIngListNoBTClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     
      {/*  pop up modal for showing only dishes ends here */}  

      {/*  pop up modal for adding dishes to update starts here */} 
      <div>
      <Modal show={showUpdateDish} onHide={showUpdateDishClose}>
        <Modal.Header closeButton>
        <Modal.Title>Add More Dishes</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
        <Row>
        <Col>Dish</Col>
        <Col>{'     '}</Col>
        <Col>Price</Col>
        <Col>{'     '}</Col>
        <Col>Quantity</Col>
        <Col>{'     '}</Col>
        <Col>Action</Col>
        </Row>
      
      {dishes.map((v) => (
        
        <form onSubmit={saveNewDish} >
          <Row>
            
            <Col> { v.dish_name } </Col>
            <Col> { v.price } </Col>
            <Col> <input type="number" id ="quantity" name="quantity" onChange={handleInputDish} style={{width: '70%'}}/>  </Col>
            <Col><Button variant="primary" onClick={() => addNewDish(v)} type="submit">
              ADD
              </Button></Col>
            </Row>
            </form>
           
          ))}
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showUpdateDishClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for aadding dishes to update ends here */}  


    </>
  );

}

export default OrderManagement;