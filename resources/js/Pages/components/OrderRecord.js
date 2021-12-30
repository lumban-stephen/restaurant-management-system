import {useState,useEffect} from "react";
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderRecord = () =>{
  //fetching data from database. Data is stored in "orderRecord" as array
  const[orderRecord, setOrderRecord]=useState([]);
  useEffect(()=>{
    fetch('/order')
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
      setOrderRecord(response)  
    })
  },[])

    const [selectedData, setSelectedData] = useState({});//data in selected cell
    const [text, setText] = useState(0);
//    const [data, setData] = useState(users);

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

//   //data is updated on front end
//   const handleUpdate = () => {
//     console.log(selectedData);
//     const name = document.getElementById("name-update");
   
//     selectedData.name = name.value;
    
//     console.log(selectedData);
//     console.log(name.value);
//     data.map((d)=>{
//       d.id === selectedData.id
//       ? { ...d, selectedData }
//       : d
      
//     })
//     updateClose();
//   }

  return (
    <>
    <div>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Order Number</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>View Order</th>
            </tr>
        </thead>
        <tbody>
            {orderRecord.map((v) => (
                <tr>
                <td>{ v.order_id }</td>
                <td>{ v.receiver }</td>
                <td>{ v.order_date }</td>
                <td>{ v.status }</td>
                <td>{v.status === 'preparing' ? (
                  <p>not yet</p>
                  ) : (
                  <p>done</p>
                  )}</td>
                <td>
                  <Button variant="success" onClick={() => hanldeClick1(v)}>View</Button>
                </td>
                </tr>
            ))} 
        </tbody>
    </Table>
    </div>
    </>
  );

}

export default OrderRecord;