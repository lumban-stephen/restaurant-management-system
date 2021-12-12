// import React, { useState, useEffect } from 'react';
// //import { Table,Button, Modal } from 'react-bootstrap';
// import Chart from 'chart.js/auto';
// import 'reactjs-popup/dist/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Pos = () =>{
//   return (
//       <div>
//           <table>
//             <tr>
//                 <td>
//                     Sales
//                 </td>
//                 <td>
//                     Products
//                 </td>
//                 <td>
//                     Records
//                 </td>
//             </tr>
//           </table>
//           <DateSalesChart />

//       </div>
//   );
// }

// export default Pos;


import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import DateSalesChart  from "./components/DateSalesChart";
import ProductSalesChart  from "./components/ProductSalesChart";
import Wallet  from "./components/Wallet";

export default function Pos(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pos</h2>}
        >
            <Head title="POS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <span>
                            <ProductSalesChart />
                            <DateSalesChart />
                        </span>
                        <Wallet />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
