import React, { useRef,useState } from 'react';
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
function ForgotOtp({data,email}) {
  const [varified,setVarified]=useState(false)
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
    console.log(data);
    const otpValue = inputRefs.map(ref => ref.current.value).join('');
    console.log(otpValue,"otpValueotpValue");
    // console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddd")
    if (data.data==otpValue){
      console.log("innnnnnnnnnnnnnnnnnn");
      setVarified(true)
      

    }
  };

  console.log(varified,"kkkkkkkkkkkkkkkk");
  const handlePassword =async(e)=>{
    e.preventDefault();
        // setIsSubmitted(true);
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      inputObject["email"]=email
      if (inputObject.pasword=inputObject.conform_password){
        const response = await axios.post(import.meta.env.VITE_BASE_URL+'user/forget/change/', inputObject);
        if (response && response.status === 200) {
          toast.success('Password changed')
          setTimeout(()=>{

              dispatch(close())
            // setconform(true)
            },4500)
        }
        else{
          toast.error('Something went wrong!')
        }
      }
  }
  return (

    varified
     ?
     <>

<Card className="mx-auto w-full max-w-[24rem]">

<CardHeader
  variant="gradient"
  color="blue"
  className="mb-4 grid h-28 place-items-center"
  >
  <Typography variant="h3" color="white">
    Sign In
  </Typography>
</CardHeader>
  <form onSubmit={handlePassword}>
<CardBody className="flex flex-col gap-4">

  {/* <Input label="Email" size="lg" name='email' /> */}
  <Input label=" New Password" type='password' name='password' size="lg" />
  <Input label='conform password' type='password'  name='conform_password'/>
  {/* <div className="-ml-2.5">
    <Checkbox label="Remember Me" />
  </div> */}
</CardBody>
<CardFooter className="pt-0">
  <Button variant="gradient" 
  // onClick={()=>dispatch(close())}
  type='submit'
  
  fullWidth>
    Submit
  </Button>
   <Typography variant="small" className="mt-6 flex justify-center">
    Don&apos;t have an account?
    <Typography
      as="a"
      variant="small"
      color="blue"
      // onClick={handelChange}

      className="ml-1 font-bold"
      >
      Sign up
    </Typography>
  </Typography>

  <Typography variant="small" className="mt-6 flex justify-center">
    
    <Typography
      as="a"
      variant="small"
      color="blue"
      // onClick={handelChange}

      className="ml-1 font-bold"
      >
      Back to login
    </Typography>
  </Typography>
</CardFooter>
  </form>
</Card>
<XMarkIcon onClick={()=>dispatch(close())} color='white' className=' w-6 h-6 ms-5 '/>
     </>
:
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
export default ForgotOtp