import React from 'react'
import {
    Button,
  } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
import { BsBoxFill } from "react-icons/bs";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { BsCash} from "react-icons/bs";


function Sheet(item) {
  console.log(item,"llllllllllllllllllllllllllllll");
    const pickup=item.item.orders.filter(order => order.status === 'pending');
    const completed=item.item.orders.filter(order => (order.status === 'completed')||(order.collected===false && order.status=="in_progress"));
    const pending=item.item.orders.filter(order=> order.status === 'pending' || (order.collected===true && order.status === 'in_progress'));
    const failed=item.item.orders.filter(order => order.status === 'return');
    const type=item.item.orders.filter(order => order.collected === true);
    let cash = 0
    // cash+=item.item.orders.map(order =>  order.booking.product_price);
      console.log("innnnnnnnnnnnnnnnnnnn");
      // Iterate through the 'orders' array and calculate the total cash value
      item.item.orders.forEach(order => {
          if (order && order.booking && order.booking.product_price) {
            console.log(order.booking.product_price,"cash")
              // Add the 'product_price' to 'cash'
              cash += order.booking.product_price;
          }
      });
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
    <div className='px-10 py-4 bg-white h-fit space-y-6'>
      <div>{item.item.name}</div>

      <div className='flex space-x-2'><BsBoxFill color='grey' className='h-6 w-6'/><span>{item.item.orders.length}</span>Shipment</div>
      <div className='  bg-blue-gray-50  flex justify-between'>

        <div className='text-center border-e-2 w-2/6 text-blue-400 opacity-75 font-black text-xl'>
          <div>{pending.length}</div>
          <div>Pending</div> 
        </div>
        <div className='border-x-2 border-gray-500 w-2/6 text-center text-red-400 opacity-75 font-black text-xl'>
          <div>{failed.length}</div>
          <div>Failed</div> 
        </div>
        <div className=' text-green-400 w-2/6 text-center opacity-75 font-black text-xl'>
          <div>{completed.length}</div>
          <div>Completed</div> 
      </div>
        </div>
        <div>{type.length===0 ? <div className='flex'><CiInboxIn   className=" w-6 h-6" />Pickup</div>:<div className='flex'><CiInboxOut className="w-6 h-6"/>delevery</div>}</div>
        <div className='flex space-x-1'><div>Cash Collected</div> <BsCash className="w-6 h-6"/> <div>:{cash}</div></div>
        <div className="">
        <Link to={`sheet/${item.item.id}`}>
            <Button  className='bg-green-500 mb-5 w-full'> view</Button>
        </Link>
        {
        pending.length ===0 &&
        <button onClick={()=>handlecloseworksheet(item.item.id)} className='bg-white text-red-900 w-full'>Runsheet close</button>
        }
        </div>
     </div>
    </>
  )
}

export default Sheet
