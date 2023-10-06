import React from 'react'
import {
    Button,
  } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
function Sheet(item) {
  console.log(item,"llllllllllllllllllllllllllllll");
    const pickup=item.item.orders.filter(order => order.status === 'pending');
    const pending=item.item.orders.filter(order=> order.status === 'pending' || order.status === 'in_progress');
    const completed=item.item.orders.filter(order => order.status === 'completed');
    const failed=item.item.orders.filter(order => order.status === 'return');


    console.log(pickup,"itemmmmmmmmmmmmmmmmmmmmm");
    const handlecloseworksheet=(id)=>{
      // console.log(id,"tttttttttttttttttttttttttttttttttt");
      api.patch(`product/worksheet/${id}/`,{'is_closed':true})
      .then((response) => {
        console.log(response.data, "orderrrrrrrrrrrrrrrrrrr");
        // setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  return (
    <>
    <div className='bg-gray-600 border-2 border-deep-orange-900'>
      <div>{item.item.name}</div>
      <div><span>{item.item.orders.length}</span>Shipment</div>
      <div className='border-2  border-yellow-900 flex justify-between'>

        <div className='text-center border-e-2 w-2/6 text-blue-900 font-black text-xl'>
          <div>{pending.length}</div>
          <div>Pending</div> 
        </div>
        <div className='border-e-2 w-2/6 text-center text-red-900 font-black text-xl'>
          <div>{failed.length}</div>
          <div>Failed</div> 
        </div>
        <div className=' text-green-900 w-2/6 text-center font-black text-xl'>
          <div>{completed.length}</div>
          <div>Completed</div> 
      </div>
        </div>

        <div>Cash Collected :200</div>
        <div className="">
        <Link to={`sheet/${item.item.id}`}>
            <Button  className='mb-5 w-full'> view</Button>
        </Link>
        {
        pending.length ===0 ?
        <Button onClick={()=>handlecloseworksheet(item.item.id)} className='bg-white text-red-900 w-full'>Runsheet close</Button>
        :
        null}
        </div>
     </div>
    </>
  )
}

export default Sheet
