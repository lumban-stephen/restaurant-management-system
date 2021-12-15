import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Button, Collapse, Card, Stack } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DateSalesChart  from "./components/DateSalesChart";
import ProductSalesChart  from "./components/ProductSalesChart";
import Wallet  from "./components/Wallet";
import OrderRecord from './components/OrderRecord';
import { padding } from 'tailwindcss/defaultTheme';

export default function Pos(props) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [table, setTable] = useState(false);

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
                        <Card bg={'primary'} className='ml-5 ml-lg-0' >
                            <Wallet />
                        </Card>
                        <Stack direction="horizontal" gap={5} className='ml-5 ml-lg-0 mt-5'>
                            <Button
                                onClick={() => {setOne(!one)}}
                                aria-controls="collapse-product"
                                aria-expanded={one}
                                md={4}
                            >
                                Product Analytics
                            </Button>
                            <Button
                                onClick={() => {setTwo(!two)}}
                                aria-controls="collapse-date"
                                aria-expanded={two}
                                md={4}
                            >
                                Date Sales Analytics
                            </Button>
                            <Button
                                onClick={() => {setTable(!table)}}
                                aria-controls="collapse-date"
                                aria-expanded={two}
                                md={4}
                            >
                                Orders Records
                            </Button>
                        </Stack>

                        <Collapse in={one}>
                            <Card body style={{width: '1000px'}} className='text-center'>
                            <Card.Title>Product Sales</Card.Title>
                                <ProductSalesChart className='text-center' />
                            </Card>
                        </Collapse>
                        <Collapse in={two}>
                        <Card body style={{width: '1000px'}} className='text-center' variant='primary'>
                            <Card.Title>Daily Sales</Card.Title>
                            <DateSalesChart className='text-center' />
                        </Card>  
                        </Collapse>
                        <Collapse in={table}>
                        <Card body style={{width: '1000px'}} className='text-center' variant='primary'>
                            <Card.Title>Order Records</Card.Title>
                            <OrderRecord />
                        </Card>  
                        </Collapse>                         
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
