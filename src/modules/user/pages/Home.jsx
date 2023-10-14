import React, { useState,useEffect } from 'react'
// import { BsSearch } from 'react-icons/Bs';
// import { FaRegUserCircle } from 'react-icons/Fa';
import image from '../images/home.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import {
  
    Button,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Dialog,
} from "@material-tailwind/react";
import Select from '../components/Select';
import Login from '../components/Login';
// import Register from '../components/register';
import Register from '../components/Register';

import { useSelector, useDispatch } from 'react-redux'
import { open  } from '../../../Redux/LoginReduser';
// import { XMarkIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/NavbarUser';
import Forgot from '../components/Forgot';
function Home() {
    const [auth ,setAuth]=useState();
    const [login,setLogin]=useState(true)
    const [orders,setOrders]=useState([])
    const [order,setorder]=useState(false)
    const[forget,setforget]=useState(false)
    useEffect(() => {
      const access=localStorage.getItem('access');
      if (access === null){
        setLogin(false)
      }
    },);
    const on=useSelector((state) => state.login.value)
    const main={
        // margin:'',
        backgroundImage: `url(${image})`,
        height:"100vh",
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
    }
    const overlayStyle = {
        content: "", // Required for the ::before pseudo-element
        position: "absolute", // Position the overlay relative to the parent element
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Set the desired opacity value here
    };
    const handelChange=()=>{
        setAuth(!auth)
    }    
    const handleForget=(e)=>{
      setforget(!forget)

    }

    const text={
        fontFamily: 'monospace'
    }
    const dispatch = useDispatch()

 
    // React.useEffect(() => {
    //   window.addEventListener(
    //     "resize",
    //     () => window.innerWidth >= 960 && setOpenNav(false)
    //   );
    // }, []);
    const navigate=useNavigate()
    const handlebooking=()=>{
      const refresh=localStorage.getItem('refresh')
      const access=localStorage.getItem('access')
      const role=localStorage.getItem('role')
    if(role &&  refresh && access){
      navigate("/booking")
    }
    else{
      dispatch(open())
      toast.warning('login for access')
    }
    }
    const handleOpen=()=>{
      setorder(!order);
    }
    
     
      return (
          <>
        {   on 
            && 
        <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none" >

            {auth ? <Register handelChange={handelChange} /> : forget? <Forgot handleForget={handleForget}  /> :<Login handelChange={handelChange} handleForget={handleForget} />}
            <ToastContainer/>
        </Dialog>
        }
          <div style={main} className='h-full'>
        <div style={overlayStyle} />

<Navbar/>

<Dialog
        open={order}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size='xl'
      >
        <DialogHeader>Product Name:{orders?.booking?.product_name}</DialogHeader>
        <DialogBody divider className=''>

        {/* <Timeline  >
        <TimelineItem  className='flex'>
          <TimelineConnector className='flex'/>
          <TimelineHeader className="h-3">
            <TimelineIcon color={order.created_at ? 'green' : 'gray'} /> 
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Order conformed
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
              {order?.created_at}
            </Typography>
          </TimelineBody>
        </TimelineItem>
       
      </Timeline> */}
      
          <ol class="items-center  sm:flex w-full">
    <li class="relative mb-6 sm:mb-0 w-2/12">
            <h3  color='' class="text-sm mb-1 font-semibold text-green-300 dark:text-white">Order conformed</h3>
        <div class="flex items-center ">
            <div class="ml-10 flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block ml-4 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{orders?.created_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class="relative mb-6 sm:mb-0 w-2/12">
            <h3  color='' class="text-sm mb-1 font-semibold text-green-300 dark:text-white">Order Collected</h3>
        <div class="flex items-center">
            <div class=" flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{orders?.collected_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class="relative mb-6 sm:mb-0 w-2/12">
            <h3  color='' class="text-sm mb-1 font-semibold text-green-300 dark:text-white">Reached nearest hub</h3>
        <div class="flex items-center">
            <div class=" flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{orders?.out_for_delivery}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class="relative mb-6 sm:mb-0 w-2/12">
            <h3  color='' class="text-sm mb-1 font-semibold text-green-300 dark:text-white">Out for Delivery</h3>
        <div class="flex items-center">
            <div class=" flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{orders?.out_for_delivery}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class="relative mb-6 sm:mb-0 w-2/12">
            <h3  color='' class="text-sm mb-1 font-semibold text-green-300 dark:text-white">Out for Delivery</h3>
        <div class="flex items-center">
            <div class=" flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{orders?.out_for_delivery}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>
    
</ol>


        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className='lg:flex  items-center justify-center md:justify-between h-full px-6 md:px-12 lg:px-24'>
  <div className='z-10 break-words  '>
    <h6 style={text} className='text-3xl antialiased font-black   text-white '>
      Logistics made easy through digital solutions
    </h6>
    <p className='antialiased text-white text-sm md:text-base lg:text-lg '>
      We make it easy to manage your shipments and logistics online. From finding a price and making bookings to submitting documents and tracking cargo.
    </p>
    <p className='antialiased text-white text-sm md:text-base lg:text-lg '>
      Register and you will soon be able to manage your logistics online.
    </p>{login ? null:
    <Button onClick={() => dispatch(open())} color='white' className=''>
      Login
    </Button>

    }
    <Button onClick={handlebooking} className='border-2 ml-2' color='white' variant="text">
      {/* Digital solution */}
      Book New Order
    </Button>
  </div>
  <Select setOrders={setOrders} setorder={setorder} order={order} orders={orders}/>
</div>
</div>


    </>
  )
}

export default Home
