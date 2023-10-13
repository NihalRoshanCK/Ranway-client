import { MapPinIcon } from '@heroicons/react/24/outline'
import React,{useState} from 'react'
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { open  } from '../../../Redux/LoginReduser';
import api from '../useraxiosInterceptor';

function Select({order,orders,setOrders,setorder}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [IsMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [approve,setApprove]=useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      
      try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL+'hub/oderdistance/', inputObject);
        if (response && response.status === 200) {
            console.log(response.data);
            if (response.data){
                setIsMessage(true)
                setMessage(response.data.time_period)
                setApprove(true)

                
            }
            else{
                setIsMessage(true)
                setMessage('service not availabe')
                setApprove(true)
                setApprove(false)

            }
        }
      }catch (error) {
        // Handle any error that occurs during the HTTP request
        console.error('Error:', error);
        setApprove(false)

        // toast.error(error.response.data.message)
    }
    }
    const handleTrack=async(e)=>{
        e.preventDefault();
        const refresh=localStorage.getItem('refresh')
        const access=localStorage.getItem('access')
        const role=localStorage.getItem('role')
        if(role &&  refresh && access){
            const formData = new FormData(e.target);
            const inputObject = Object.fromEntries(formData);
            api.post(`product/order/trackorder/`,inputObject)
          .then((response) => {
            setOrders(response.data)
            setorder(true)
        //   setTABLE_ROWS(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        }
        else{
            dispatch(open())
            toast.warning('login for access')
        }
    }
    const [value, setValue] = useState('track');
    if (value==='track'){

        return (
            
            <div className=' bg-white z-10 rounded sm:w-fll md:w-full lg:w-1/3 h-56' >
        <div className=' p-8 flex text-center gap-6'>
            <h1 onClick={()=>setValue('track')} className='hover:cursor-pointer border-b-2  border-b-light-blue-800'>
                Tracking
            </h1>
            <h1 onClick={()=>setValue('shadules')} className='hover:cursor-pointer border-b-2   hover:border-b-light-blue-800'>
            Schedule
            </h1>
            
        </div>
        <div className='flex-col space-y-3'>
            <form onSubmit={handleTrack}>

        <div className='relative ms-4 w-full'> 
            <MapPinIcon color='gray' className=' absolute w-8 h-8  top-1/2 transform -translate-y-3'/>
            <Input variant="static" name='orderId' className='pl-10 w-10/12' placeholder="Enter the traking ID" />
        </div>
            <button type='submit' className='ms-4 bg-blue-gray-900 text-white rounded p-2 translate-y-1'>Track</button>
            </form>
        </div>
    </div>
  )
}else{
    return (
            
        <div className='bg-white z-10 rounded sm:w-fll md:w-full lg:w-1/3 h-fit' >
    <div className=' pt-8 pl-8 flex text-center gap-6'>
        <h1 onClick={()=>setValue('track')} className='hover:cursor-pointer border-b-2   hover:border-b-light-blue-800'>
            Tracking
        </h1>
        <h1 onClick={()=>setValue('shadules')} className='hover:cursor-pointer border-b-2 border-b-light-blue-800'>
            Schedule
        </h1>
        
    </div>
        <form onSubmit={handleSubmit} >
        <div className='p-5'>
            <div className='relative '>
                <MapPinIcon color='gray' className=' absolute w-8 h-8  top-1/2 transform -translate-y-3'/>
                <Input name='from_zipcode' variant="static" className='pl-10 w-full' placeholder="Orgin" maxLength={6} />
            </div>
            <div className='relative '> 
                <MapPinIcon color='gray' className=' absolute w-8 h-8  top-1/2 transform -translate-y-3'/>
                <Input name='to_zipcode' variant="static" className='pl-10 ' placeholder="Destination" maxLength={6} />
            </div>
            {approve? <button type='button' onClick={()=>navigate("/booking")} className='bg-blue-gray-900 text-white rounded p-2 translate-y-1'>book a slot</button>: <button type='submit' className='bg-blue-gray-900 text-white rounded p-2 translate-y-1'>Sreach</button>}
        </div>
        {IsMessage ? <p>{message}</p>:null}
        </form>
</div>
)

}
}

export default Select
