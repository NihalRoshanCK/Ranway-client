import React, { useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
  } from "@material-tailwind/react";
import { XMarkIcon } from '@heroicons/react/24/solid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { close } from '../../../Redux/LoginReduser';
import { useSelector, useDispatch } from 'react-redux'
import Otp from './Otp';
function register({handelChange}) {
    const[data,setdata]=useState()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsSubmitted(true);
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      const errors = {};

    if (!inputObject.email) {
      return toast.warning('email is required')
    } else if (!isValidEmail(inputObject.email)) {
      return toast.warning('enter a correct email format')
    }

    if (!inputObject.password) {
      return toast.warning('Password is required')
    } 
    // else if (!isValidPassword(inputObject.password)) {
    //   return toast.warning(
    //     'Password must contain at least one uppercase letter, one lowercase letter, and one special character')
    // }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if(inputObject.password!=inputObject.confornpassword){
      return toast.warning('password does not match')

    }
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/userverify/', inputObject);
          
          // Check if the response is successful
          if (response && response.status === 200) {
            toast.success('Otp sented to email')
            console.log(response.data)
            inputObject['otp']=response.data
            console.log(inputObject,"fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
            setdata(inputObject)
            // console.log(data)
            setRegisterd(!registerd)
            
            // Handle success response and further actions upon successful login here
          } else {
            // Handle other scenarios where the response is not successful
            console.error('Register failed:', response);
            toast.warning('error')
          }
        } catch (error) {
          // Handle any error that occurs during the HTTP request
          console.error('Error:', error);
          toast.error(error.response.data.detail)
        }
      };
      const isValidEmail = (email) => {
        // Simple email format validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      const isValidPassword = (password) => {
        // Password validation using regular expression
        // Requires at least one uppercase letter, one lowercase letter, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };
    const on =useSelector((state) => state.login.value)
    const dispatch = useDispatch()
    const [registerd,setRegisterd]=useState(false)
  return (
    <>
    {registerd ?  <Otp data={data}/> : <>
             <Card className="mx-auto w-full max-w-[24rem]">

              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
                >
                <Typography variant="h3" color="white">
                  Sign Up
                </Typography>
              </CardHeader>
                <form onSubmit={handleSubmit}>
              <CardBody className="flex flex-col gap-4">

                <Input label="Email" size="lg" name='email' />
                <Input label='Name' name='name'/>
                <Input label="Password" name='password' size="lg" />
                <Input label="Conform Password" name='confornpassword' size="lg" />
                <div className='flex'>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-8 w-8"
                  >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                    />
                </svg>
                <h1>

                Use at least 8 characters, one uppercase, one lowercase and one number.
                </h1>
                    </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" 
                type='submit'
                
                fullWidth>
                  Sign Up
                </Button>
                 <Typography variant="small" className="mt-6 flex justify-center">
                   Already have an account?
                  <Typography
                    as="a"
                    variant="small"
                    color="blue"
                    onClick={handelChange}
                    
                    className="ml-1 font-bold"
                    >
                    Sign In
                  </Typography>
                </Typography>
              </CardFooter>
                </form>
             </Card>
            <XMarkIcon onClick={()=>dispatch(close())} color='white' className='w-6 h-6 ms-5 '/>
                

</>

}
</>
  )
}

export default register
