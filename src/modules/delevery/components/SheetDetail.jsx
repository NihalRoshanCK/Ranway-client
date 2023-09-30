import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
import { Card } from "@material-tailwind/react";


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
        <Link to={`/delevery/order/${order.id}`}>
          <Card className='m-5 bg-yellow-300 rounded-none'>
            <div>{order.order_id}</div>
            <div>{order.booking.user.name}</div>
            {order.collected?<div>{order.booking.to_address}</div>:<div>{order.booking.from_address}</div>}
            <hr />
            {order.collected?<div>Delevery</div>:<div>Pickup</div>}

          </Card>
        </Link>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default SheetDetail;
