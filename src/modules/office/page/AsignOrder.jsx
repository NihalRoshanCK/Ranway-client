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
import { toast } from 'react-toastify';
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
            console.error(error)
            toast.error(error?.data?.message)
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

    <div className=' h-screen'>
        <div className=''>
        <div className='mt-5 '>
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
        <Card className='mt-3 overflow-scroll bg-blue-gray-200 h-4/6'>

            {orders.map((order)=>(
                // <Card color='red' className='w-full m-3 h-10 '>
                <div className='flex justify-between space-y-3 m-2 bg-white'>
                    <h1 className='m-3 p-2 '>{order.order_id}</h1>
                    <div onClick={()=>del(order.order_id)} className=' text-white   flex justify-center items-center'><h1 className='bg-red-700 rounded-xl p-2 m-2'>cancel</h1> </div>
                    </div>
                // </Card>
                ))
                
            }
            </Card>
            <Button className='float-right m-5 w-40' onClick={handleSubmit}>Submit</Button>
        {/* </div> */}
    </div>

  )
}

export default Asignorder
