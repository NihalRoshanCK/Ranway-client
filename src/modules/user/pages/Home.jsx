import React, { useState,useEffect } from 'react'
import { BsSearch } from 'react-icons/Bs';
import { FaRegUserCircle } from 'react-icons/Fa';
import image from '../images/home.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  
    Button,
    Dialog,
} from "@material-tailwind/react";
import Select from '../components/Select';
import Login from '../components/Login';
import Register from '../components/register';
import { useSelector, useDispatch } from 'react-redux'
import { open,close } from '../../../Redux/LoginReduser';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/NavbarUser';
function Home() {
    const [auth ,setAuth]=useState();
    const [login,setLogin]=useState(true)
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

    
     
      return (
          <>
        {   on 
            && 
        <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none" >

            {auth ? <Register handelChange={handelChange} /> : <Login handelChange={handelChange} />}
            <ToastContainer/>
        </Dialog>
        }
          <div style={main} className='h-full'>
        <div style={overlayStyle} />

<Navbar/>

      <div className='lg:flex  items-center justify-center md:justify-between h-full px-6 md:px-12 lg:px-24'>
  <div className='z-10 break-words '>
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
    <Button className='border-2' color='white' variant="text">
      Digital solution
    </Button>
  </div>
  <Select/>
</div>
</div>


    </>
  )
}

export default Home
