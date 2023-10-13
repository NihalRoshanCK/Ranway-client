import React, { useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';  
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
  } from "@material-tailwind/react";
//   import { toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
import {  useDispatch } from 'react-redux'
  
//   import axios from 'axios';
  import { close } from '../../../Redux/LoginReduser';
// import { XMarkIcon } from '@heroicons/react/24/solid';
function Otp({data}) {
    const dispatch = useDispatch()

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));
  
    const handleInputChange = (index, event) => {
        const input = event.target;
        const value = input.value;
    
        if (value.length === 1) {
          if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
          }
        } else if (value.length === 0) {
          if (index > 0) {
            inputRefs[index - 1].current.focus();
          }
        }
      };
    
      const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            if (index > 0) {
                inputRefs.current[index - 1].focus()    
            }
          }
        };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const otpValue = inputRefs.map(ref => ref.current.value).join('');
    // console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddd")
    if (data.otp===otpValue){
        try {
          const response = await axios.post(import.meta.env.VITE_BASE_URL+'user/register/', data);
          
          // Check if the response is successful
          if (response && response.status === 200) {
              console.log(response.data,"responseeeeeeeeeeeeeeeee");
              localStorage.setItem('refresh', response.data.refresh)
              localStorage.setItem('access', response.data.access)
              
              toast.success('Registered successfully')
              console.log(response.data)
              
             
                  setTimeout(()=>{
        
                      dispatch(close())
                  },1500)
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
    }
  };

  return (
    <> 
             <Card className="mx-auto w-full max-w-[24rem]">
    
             <CardHeader
                variant="gradient"
                color="blue"
                className=" mb-4 grid h-28 place-items-center"
                > 
                {/* <Typography className='flex justify-end te' variant="h3" color="white">
                  x
                </Typography> */}
                <Typography variant="h3" color="white">
                  OTP
                </Typography>
              </CardHeader>
              <form onSubmit={handleSubmit}>
              
              <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" >
                  Enter the Otp sent to your Email
                </Typography>
              <div className="flex gap-2 justify-center items-center">
              {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            className='border-2 border-light-blue-800 w-12 h-14 text-4xl flex text-center justify-center items-center'
            type='text'
            maxLength={1}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
          </div>
                </CardBody>
                <CardFooter className="pt-0">
                <Button variant="gradient" 
                type='submit'
                
                fullWidth>
                  Submit
                </Button>
              </CardFooter>
                </form>
             </Card>
            <XMarkIcon onClick={()=>dispatch(close())} color='red' className=' absolutew-6 h-6 ms-5 '/>



    </>
  )
}
export default Otp