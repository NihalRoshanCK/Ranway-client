import React, { useState, useEffect } from 'react';
import { Input } from "@material-tailwind/react";
import api from '../officeaxiosInterceptor';
import debounce from 'lodash/debounce';

function AsignProduct(setOrders,orders) {
    const [orderId, setOrderId] = useState("");

    // Define a debounced version of the sendPostRequest function
    
    const handleChange = (e) => {
        const value = e.target.value;
        setOrderId(value);
    }

    const sendPostRequest = async (orderId) => {
        try {
            console.log(orderId);
            if (orderId.length==21){
                const response = await api.post(`product/order/order_asign/`, { orderId });
                console.log(response.data);
                setOrders([...orders,response.data])

            }
            // You can perform actions with the response data here
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    const debouncedSendPostRequest = debounce(sendPostRequest, 10000);
    
        useEffect(() => {
            // This effect runs whenever orderId changes, but only after a 10-second delay
            debouncedSendPostRequest(orderId);
        }, [orderId]);
    
    return (
        <div className='mt-5'>
            <Input onChange={handleChange} maxLength={21} label="enter the order id" />
        </div>
    )
}

export default AsignProduct;
