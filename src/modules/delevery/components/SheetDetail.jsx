import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
import { Card } from "@material-tailwind/react";
import { RiLogoutBoxRFill} from 'react-icons/ri';
// import { MdCancelPresentation} from 'react-icons/md';
import {ArchiveBoxArrowDownIcon} from "@heroicons/react/24/solid"

function SheetDetail() {
  const [orders, setOrders] = useState([]); // Use an array to store orders
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`product/worksheet/${id}`);
        console.log(response.data);
        setOrders(response.data.orders); // Set the orders array in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  console.log(id, "iddddddddddddddddddddddddddddd");

  return (
    <>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => ( // Map over the orders array
        <div >
        {
order.collected ? 

order.status==='completed' ?
        (<>
          <Link to=''>
          <Card  className='m-5 p-5 space-y-1 bg-gray-200 rounded-none'>
            <div className='break-all'>{order.order_id}</div>
            <div className='break-all'>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            <div className='flex'><RiLogoutBoxRFill className='h-6 w-6' color='green'/><div>Delevered</div></div>
          </Card>
        </Link>
        
        </> )
	:
order.status==='return' ?

         (<>
          <Link to=''>
          <Card  className='m-5 p-5 space-y-1  bg-red-400 rounded-none'>
            <div className='break-all'>{order.order_id}</div>
            <div className='break-all'>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            {order.collected?<div>Delevery Returned</div>:<div>Pickup Cancelled</div>}

          </Card>
        </Link>
        
        </> )
	:
	(<> 
        <Link to={`/delevery/order/${order.id}`}>
          <Card  className='m-5 p-5 space-y-1  rounded-none'>
            <div className='break-all'>{order.order_id}</div>
            <div className='break-all'>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            {order.collected?<div className='flex'><RiLogoutBoxRFill className='h-6 w-6'/> <div> Delevery</div></div>:<div><ArchiveBoxArrowDownIcon className='w-6 h-6'/><div>Pickup</div></div>}

          </Card>
        </Link>
        
        </>)
	:
order.status==='in_progress' ?
        (<> 
        <Link to=''>
          <Card  className='bg-green-100 m-5 p-5 space-y-1 rounded-none'>
            <div className='break-all'>{order.order_id}</div>
            <div className='break-all'>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            {order.collected?<div className='flex'><RiLogoutBoxRFill className='h-6 w-6'/> <div> Delevery</div></div>:<div className='flex'><ArchiveBoxArrowDownIcon className='w-6 h-6' color='orange'/><div>Pickup Collected</div></div>}

          </Card>
        </Link>
        
        </>)
	:
  order.status==='return' ?
  (<> 
    <Link >
      <Card  className='m-5 p-5 space-y-1  bg-red-400 rounded-none'>
        <div className='break-all'>{order.order_id}</div>
        <div className='break-all'>{order.booking.user.name}</div>
        {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
        <hr />
        {order.collected?<div className='flex'><RiLogoutBoxRFill className='h-6 w-6'/> <div> Delevery</div></div>:<div className='flex'><ArchiveBoxArrowDownIcon color='orange' className='w-6 h-6'/><div>Pickup Canceled</div></div>}

      </Card>
    </Link>
    
    </>):

	(<> 
        <Link to={`/delevery/order/${order.id}`}>
          <Card  className='m-5 p-5 space-y-1  rounded-none'>
            <div className='break-all'>{order.order_id}</div>
            <div className='break-all'>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            {order.collected?<div className='flex'><RiLogoutBoxRFill className='h-6 w-6'/> <div> Delevery</div></div>:<div className='flex'><ArchiveBoxArrowDownIcon color='orange' className='w-6 h-6'/><div>Pickup</div></div>}

          </Card>
        </Link>
        
        </>)



}
        
        </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default SheetDetail;
