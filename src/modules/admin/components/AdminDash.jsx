import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader
  } from "@material-tailwind/react";
  import { BsFillBox2Fill } from 'react-icons/bs';

function AdminDash() {
  return (
    <>
    <div>

    <div className='mt-8 lg:flex justify-evenly gap-2 '>

    <Card className="w-full mt-11 lg:mt-0 ">
        <div className='flex justify-between '>

        <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4  grid h-16 w-16 justify-center items-center"
        >
        <BsFillBox2Fill className='h-6 w-6'/>
        </CardHeader>
        <div className='m-5'>
            <h1 className='text-lg'>
                Orders
            </h1>
            <h1 className=' font-black text-xl float-right'>
               281
            </h1>

        </div>
            </div>
            <CardFooter>
                <hr className='from-gray-50 to-gray-900 ' />
                <h1 className='text-lg pt-2'><span className='font-black text-green-300'>+55% </span>than last month</h1>
            </CardFooter>
    </Card>
    <Card className="w-full mt-11 lg:mt-0 ">
        <div className='flex justify-between '>

        <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4  grid h-16 w-16 justify-center items-center"
        >
        <BsFillBox2Fill className='h-6 w-6'/>
        </CardHeader>
        <div className='m-5'>
            <h1 className='text-lg'>
                Orders
            </h1>
            <h1 className=' font-black text-xl float-right'>
               281
            </h1>

        </div>
            </div>
            <CardFooter>
                <hr className='from-gray-50 to-gray-900 ' />
                <h1 className='text-lg pt-2'><span className='font-black text-green-300'>+55% </span>than last month</h1>
            </CardFooter>
    </Card>
    <Card className="w-full mt-11 lg:mt-0  ">
        <div className='flex justify-between '>

        <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4  grid h-16 w-16 justify-center items-center"
        >
        <BsFillBox2Fill className='h-6 w-6'/>
        </CardHeader>
        <div className='m-5'>
            <h1 className='text-lg'>
                Orders
            </h1>
            <h1 className=' font-black text-xl float-right'>
               281
            </h1>

        </div>
            </div>
            <CardFooter>
                <hr className='from-gray-50 to-gray-900 ' />
                <h1 className='text-lg pt-2'><span className='font-black text-green-300'>+55% </span>than last month</h1>
            </CardFooter>
    </Card>
    <Card className="w-full mt-11 lg:mt-0  ">
        <div className='flex justify-between '>

        <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4  grid h-16 w-16 justify-center items-center"
        >
        <BsFillBox2Fill className='h-6 w-6'/>
        </CardHeader>
        <div className='m-5'>
            <h1 className='text-lg'>
                Orders
            </h1>
            <h1 className=' font-black text-xl float-right'>
               281
            </h1>

        </div>
            </div>
            <CardFooter>
                <hr className='from-gray-50 to-gray-900 ' />
                <h1 className='text-lg pt-2'><span className='font-black text-green-300'>+55% </span>than last month</h1>
            </CardFooter>
    </Card>
    </div>
    <div>

    <Card className="">
        <div className=''>

        <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
        >
            
        </CardHeader>
      
            </div>
            <CardFooter>
                
            </CardFooter>
    </Card>
            </div>
    </div>
    </>
  )
}

export default AdminDash
