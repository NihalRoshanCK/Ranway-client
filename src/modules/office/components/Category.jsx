import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Avatar,
    Typography,
    Input
} from "@material-tailwind/react";
import Table from './Table';
function Category() {
  return (
    <>
    <div className='p-5'>

    <Card className='m-6  h-screen'>
    <CardHeader>
        <Card  color="blue" className='p-6'>
        <Typography>
            Order Collecting
        </Typography>

        </Card>
    </CardHeader>
    <div className='p-7'>

    <Input name="order" label="Order" size="xl" />

    </div>
    <Table/>
    </Card>
    </div>
    </>
  )
}

export default Category
