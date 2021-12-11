import React, { useState, useEffect } from 'react';
import { Table,Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const Dishes = () =>{
//   //fetching data from database. Data is stored in "users" as array
//   const[dishes, setDishes]=useState([]);
//   useEffect(()=>{
//     fetch('/dishindex')
//     .then(response=>response.json())
//     .then(response=>{
//       console.log(response);
//       setDishes(response)  
//     })
    
//   },[])

//     //fetching data from database. Data is stored in "users" as array
//     const[dishIng, setDishIng]=useState([]);
//     useEffect(()=>{
//       fetch('/dishingredientsindex')
//       .then(response=>response.json())
//       .then(response=>{
//         console.log(response);
//         setDishIng(response)  
//       })
      
//     },[])

//     const[ingredient, setIngredient]=useState([]);
//     useEffect(()=>{
//       fetch('/inventory')
//       .then(response=>response.json())
//       .then(response=>{
//         console.log(response);
//         setIngredient(response)  
//       })
      
//     },[])
    
//     const [view, setView] = useState(false);//see details
//     const [update, setUpdate] = useState(false);//update
//     const [del, setDel] = useState(false);//delete
//     const [addDish, setaddDish] = useState({});//add new dish 
//     const [addDi, setaddDi] = useState({});//add new dish ingredient
//     const [selectedData, setSelectedData] = useState({});//data in selected cell
//     const [text, setText] = useState(0);
//     const [data, setData] = useState(dishes);

//     const viewClose = () => setView(false);
//    // const viewShow = () => setView(true);

//     const updateClose = () => setUpdate(false);
//   //  const updateShow = () => setUpdate(true);

//     const delClose = () => setDel(false);
//   //  const delShow = () => setDel(true);

//     const addClose = () => setaddDish(false);
//     const addShow = () => setAddDish(true);

//     const addIngredientShow = () => setaddDi(true);
//     const addIngredientClose = () => setaddDi(false);

      //add new ingredients and send it to database
      const addNew = async (e) => {
        e.preventDefault();
        console.log(addem);
        const res = await axios.post('/dishsave',addem).then(res => console.log(res.data));
    
      }
  
        //when you click save changes, it is sent to database
    const saveUpdate = async (e) => {
      e.preventDefault();
      console.log(selectedData);
      const res = await axios.post('/dishupdate',selectedData).then(res => console.log(res.data));
  
    }
  
        //when you click save changes, it is sent to database
    const deleteDish = async (e) => {
      e.preventDefault();
      console.log(selectedData);
      const res = await axios.post('/dishdel',selectedData).then(res => console.log(res.data));
  
    }

//   // when you click the button, data in the cell will be stored in setSelectedData   
//   const hanldeClick1 = (selectedRec) => {
//     setSelectedData(selectedRec);
//     setView(true);
//   };

//   const hanldeClick2 = (selectedRec) => {
//     setSelectedData(selectedRec);
//     setUpdate(true);
//   };

//   const hanldeClick3 = (selectedRec) => {
//     setSelectedData(selectedRec);
//     setDel(true);
//   };

//   //data is updated on front end
//   const handleUpdate = () => {
//     console.log(selectedData);
//     const dish_name = document.getElementById("dish_name-update");
//     const price = document.getElementById("price-update");    
   
//     selectedData.dish_name = dish_name.value;
//     selectedData.price = price.value;
    
//     data.map((d)=>{
//       d.dish_id === selectedData.id
//       ? { ...d, selectedData }
//       : d
      
//     })
//     updateClose();
//   }

<<<<<<< Updated upstream
  return (
    <>
    <Button variant="primary" onClick={addShow}>Add New Dish</Button>
    <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Dish Name</th>
                <th>Price</th>
                <th>Ingredients</th>
                <th colSpan="3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {dishes.map((v) => (
                        <tr>
                        <td> { v.id } </td>
                        <td> { v.dish_name } </td>
                        <td> { v.price } </td>
                        <td> <Button variant="warning" onClick={() => showIngredients(v.id)}>...</Button> </td>
                        <td>  
                            <Button variant="success" onClick={() => addNew(v)}>View</Button>
                            <Button variant="warning" onClick={() => saveUpdate(v)}>Update</Button>
                            <Button variant="danger" onClick={() => deleteDish(v)}>Delete</Button>
                        </td>
                        </tr>
                    ))}
            </tbody>    
        </Table>
    </div>
=======
const Dishes = () => {
  function AddDish() {
>>>>>>> Stashed changes

    const history = useHistory();
    const [dishInput, setDish] = useState({
        dish_name: '',
        price: '',
        error_list: [],
    });
  
    const handleInput = (e) => {
        e.persist();
        setDish({...dishInput, [e.target.dish_name]: e.target.value })
    }
  
    const saveDish = (e) => {
        e.preventDefault();
        
        const data = {
            dish_name:dishInput.dish_name,
            price:dishInput.price,
        }
  
        axios.post(`/api/add-dish`, data).then(res => {
  
            if(res.data.status === 200)
            {
                //swal("Success!",res.data.message,"success");
                setDish({
                    dish_name: '',
                    price: '',
                    error_list: [],
                });
                history.push('/dish');
            }
            else if(res.data.status === 422)
            {
                setDish({...dishInput, error_list: res.data.validate_err });
            }
        });
    }
  }
  
    function ViewStudent() {
  
      const [dishes, setDishes] = useState([]);
  
      useEffect(() => {
  
          axios.get(`/api/dish`).then(res=>{
              if(res.status === 200)
              {
                  setDishes(res.data.dishes)
              }
          });
  
      }, []);
  
      const deleteDish = (e, id) => {
          e.preventDefault();
          
          const thisClicked = e.currentTarget;
          thisClicked.innerText = "Deleting";
  
          axios.delete(`/api/delete-dish/${id}`).then(res=>{
              if(res.data.status === 200)
              {
                  console.log("Deleted!");
                  //swal("Deleted!",res.data.message,"success");
                  //thisClicked.closest("tr").remove();
              }
              else if(res.data.status === 404)
              {
                  console.log("error");
                  //swal("Error",res.data.message,"error");
                  //thisClicked.innerText = "Delete";
              }
          });
      }
    }
  
      function EditDish(props) {
  
        const history = useHistory();
        const [errorInput, setError] = useState([]);
    
        useEffect(() => {
            
            const dish_id = props.match.params.id;
            axios.get(`/api/edit-dish/${dish_id}`).then( res => {
    
                if(res.data.status === 200)
                {
                    setStudent(res.data.dish);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message,"error");
                    history.push('/dish');
                }
            });
    
        }, [history]);
    
        const updateDishes = (e) => {
            e.preventDefault();
            
            const dish_id = props.match.params.id;
            // const data = dishInput;
            const data = {
                dish_name: dishInput.dish_name,
                price: dishInput.price,
            }
    
            axios.put(`/api/update-dish/${dish_id}`, data).then(res=>{
                if(res.data.status === 200)
                {
                    //swal("Success",res.data.message,"success");
                    setError([]);
                    history.push('/dish');
                }
                else if(res.data.status === 422)
                {
                    //swal("All fields are mandetory","","error");
                    setError(res.data.validationErrors);
                }
                else if(res.data.status === 404)
                {
                    //swal("Error",res.data.message,"error");
                    history.push('/dish');
                }
            });
        }
  
    return (
      <>
      <Button variant="primary" onClick={addShow}>Add New Dish</Button>
      <div>
          <Table striped bordered hover>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Dish Name</th>
                  <th>Price</th>
                  <th>Ingredients</th>
                  <th colSpan="3">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {dishes.map((item, index) => (
                          <tr key={index}>
                          <td> { item.id } </td>
                          <td> { item.dish_name } </td>
                          <td> { item.price } </td>
                          <td> <Button variant="warning" onClick={() => showIngredients(item.id)}>...</Button> </td>
                          <td>  
                              <Button variant="success" onClick={() => hanldeClick1(item)}>View</Button>
                              <Button variant="warning" onClick={() => hanldeClick2(item)}>Update</Button>
                              <Button variant="danger" onClick={ (e) => deleteDish(e, item.id) }>Delete</Button>
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
            <Modal.Title>Dish Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
            <article>
                <p>Dish Name: { selectedData?.dish_name }</p>
                <p>Dish Price: { selectedData?.price } </p>
                <p>Dish Ingredients: </p>
                { dishIng.filter(() => {
                    if(selectedData?.id === dishIng.dish_id) {
                        return selectedData
                    }else{
                        return;
                    } 
                }).map(ingredient => (
                    <p> { ingredient } </p>
                ) ) }
            </article>
  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={viewClose}>
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
                  <Modal.Title>Update Dish</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <table class="table">
                      <tr>
                          <th>Dish Name</th>
                          <th>Price</th>
                          <th>Ingredients</th>
                      </tr>
                      <tr>
                          <td>{selectedData?.dish_name}</td>
                          <input type="text" id ="dish_name-update" defaultValue={selectedData?.dish_name} dish_name="dishname"/>
                          <td>{selectedData?.price}</td>
                          <input type="text" id ="price-update" defaultValue={selectedData?.price} dish_name="price"/>
                          
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
            <Modal.Title>Delete Dish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <article>
              <p>Are you sure you want to delete { selectedData?.dish_name }?</p>
            </article>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={delClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e) => deleteStudent(e, item.id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        {/*  pop up modal for Delete ends here */} 
  
        {/*  pop up modal for add dish starts here */} 
        <div>
<<<<<<< Updated upstream
          <form onSubmit={ saveDish }>
            <Modal show={addDish} onHide={addClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new dish</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>Dish Name: </label>
                <input type="text" id ="dish_name-add" dish_name="dish_name" onChange={handleInput} />
                <span></span>
                <label>Dish Price: </label>
                <input type="text" id ="price-add" dish_name="price" onChange={handleInput} />
                <span></span>
                <label>Select Ingredients: </label>
                <Button variant="warning" onClick={addIngredientShow}>
                      ADD INGREDIENTS
=======
            <Modal show={update} onHide={updateClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Dish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table class="table">
                    <tr>
                        <th>Dish Name</th>
                        <th>Price</th>
                        <th>Ingredients</th>
                    </tr>
                    <tr>
                        <form method="post">
                        <td>{selectedData?.dish_name}</td>
                        <input type="text" id ="name-update" defaultValue={selectedData?.dish_name} name="dishname"/>
                        <td>{selectedData?.price}</td>
                        <input type="text" id ="price-update" defaultValue={selectedData?.price} name="price"/>
                        </form>
                    </tr>
                </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={updateClose}>
                    Close
>>>>>>> Stashed changes
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={addClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" onClick={addClose} >
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
        {/*  pop up modal for add dish ends here */} 
        
        {/*  pop up modal for add dish ingredient starts here */} 
        
        <Modal show={addDi} onHide={addIngredientClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ingredients for new dish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table class="table">
                <tr>
                  <th>Checkbox</th>
                  <th>Ingredients</th>
                  <th>Ingredient Qty</th>
                </tr>
                { ingredient.map((i) => {
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      { i.food_name }
                    </td>
                    <td>
                      <input type="text" placeholder='Enter Quantity' />
                    </td>
                  </tr>
                }) }
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={addClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/*  pop up modal for add dish ingredient ends here */} 
      </>
    );
  
  }
}

export default Dishes;
