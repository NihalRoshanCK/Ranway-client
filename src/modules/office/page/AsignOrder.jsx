// import React, { useState } from 'react'
import DeleverySelect from '../components/DeleverySelect'
// import AsignProduct from '../components/AsignProduct'
import React, { useState, useEffect } from 'react';
import { 
    Input,
    Card,
    Button,
    Select,
    Option
 } from "@material-tailwind/react";
import api from '../officeaxiosInterceptor';
import debounce from 'lodash/debounce';
import card from '@material-tailwind/react/theme/components/card';
function Asignorder() {
    const [orderId, setOrderId] = useState("");
    const [orders,setOrders]=useState([])

    const [select,setSelect]=useState([])
    const [items,setItems]=useState([])

    const handleSelect = (event)=>{
        console.log('Event:', event);
        setSelect(event);
      }
    // Define a debounced version of the sendPostRequest function
    
    const handleChange = (e) => {
        const value = e.target.value;
        setOrderId(value);
    }
    const del=(id)=>{
        setOrders(orders.filter((obj)=>obj.order_id!==id));
        
      }
    const handleSubmit=async()=>{
        console.log("hiiiiiiiiiiiiiiiiiiiii");
        let arr=[]
        orders.map((id,index)=>{
            arr[index]=id.id
            console.log(id.id,"idddddddddddddddddddddd")

        })
        console.log(arr,"arr");
        api.post(`product/worksheet/`,{"orders":arr,"user":select.id}).then((response)=>{
            console.log(response.data)
            window.location.reload();
        })
    }

    const sendPostRequest = async (orderId) => {
        try {
            console.log(orderId);
            if (orderId.length==21){
                const response = await api.post(`product/order/order_asign/`, { orderId });
                console.log(response.data);
                setOrders([...orders,response.data])
                setOrderId("")

            }
            // You can perform actions with the response data here
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    const debouncedSendPostRequest = debounce(sendPostRequest, 1000);
    
        useEffect(() => {
            // This effect runs whenever orderId changes, but only after a 10-second delay
            debouncedSendPostRequest(orderId);
        }, [orderId]);
        
  useEffect(() => {
    (async()=>{
        
        api.get(`hub/deliverystaff/`).then((response)=>{
            console.log(response.data)
            setItems(response.data)
        })
        
    })()
}, []);
    console.log(orders,"ordersordersordersordersordersordersordersorders");
    console.log(select,"selectselectselectselectselectselect");
  return (

    <div className=' h-screen bg-blue-gray-600'>
        <div className=''>
        <div className='pt-5'>
        <Select  onChange={handleSelect} name='delevery  boy' color="indigo" label="deleveryboy">
            {items.map((cat) => (
              <Option value={cat} >{cat["user"].name}</Option>
              ))}
          </Select>
    </div>
            <div className='mt-5'>
            <Input onChange={handleChange} maxLength={21} label="enter the order id" value={orderId} />
            </div>
        </div>
        {/* <div className='bg-white'> */}
        <Card className='mt-3'>

            {orders.map((order)=>(
                // <Card color='red' className='w-full m-3 h-10 '>
                <div className='flex'>
                    <h1 className='m-3 p-2 border-gray-900 border-2 w-11/12'>{order.order_id}</h1>
                    <h1 onClick={()=>del(order.order_id)} className='text-red-900 flex justify-center items-center'>cancel</h1>
                    </div>
                // </Card>
                ))
                
            }
            </Card>
            <Button onClick={handleSubmit}>Submit</Button>
        {/* </div> */}
    </div>

  )
}

export default Asignorder
