import { MapPinIcon } from '@heroicons/react/24/outline'
import React,{useState} from 'react'
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Select() {
    const navigate=useNavigate()
    const [IsMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [approve,setApprove]=useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/hub/oderdistance/', inputObject);
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
    const [value, setValue] = useState('track');
    if (value==='track'){

        return (
            
            <div className=' bg-white z-10 rounded sm:w-fll md:w-full lg:w-1/3 h-fit' >
        <div className=' p-8 flex text-center gap-6'>
            <h1 onClick={()=>setValue('track')} className='hover:cursor-pointer border-b-2  border-b-light-blue-800'>
                Tracking
            </h1>
            <h1 onClick={()=>setValue('shadules')} className='hover:cursor-pointer border-b-2   hover:border-b-light-blue-800'>
            Schedule
            </h1>
            
        </div>
        <div className='flex-col'>

        <div className='relative ms-4 w-full'> 
            <MapPinIcon color='gray' className=' absolute w-8 h-8  top-1/2 transform -translate-y-3'/>
            <Input variant="static" className='pl-10 w-11/12' placeholder="Enter the traking ID" />
        </div>
            <button className='ms-4  bg-blue-gray-900 text-white rounded p-2 translate-y-1'>Track</button>
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
