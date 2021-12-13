import React, { useState, useEffect } from 'react';
//import { Table,Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductSalesChart = () =>{    

    const data = {
    labels: [
      'Herb Roasted Chicken',
      'Coffee Roasted Spare Rib',
      'Masala dosa',
      'Ohmi-gyu beef steak'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100, 250],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 0, 0)'
      ],
      hoverOffset: 4
    }]
    };

    return (
        <div className='text-center'>
            <h1>Most sold product of the week:</h1>
            <div style={{width:"50%"}} >
                <Doughnut data = { data } />
            </div>
            
        </div>
     );
}

export default ProductSalesChart;