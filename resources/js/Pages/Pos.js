import React, { useState, useEffect } from 'react';
//import { Table,Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import DateSalesChart  from "./components/DateSalesChart";
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pos = () =>{
  return (
      <div>
          <table>
            <tr>
                <td>
                    Sales
                </td>
                <td>
                    Products
                </td>
                <td>
                    Records
                </td>
            </tr>
          </table>
          <DateSalesChart />

      </div>
  );
}

export default Pos;
