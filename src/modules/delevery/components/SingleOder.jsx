import React,{useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
import Test from './Scanner';
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { data } from 'autoprefixer';
function SingleOder() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [order,setOrder]=useState(null)
//   const [result, setResult] = useState('No result');
  const [result, setResult] = useState('No result');
  const [cash,setCash]=useState(false)
  const [scan,setScan]=useState(false)
  useEffect(() => {
    console.log("innnnnnnnnnnnnnnn");
    api.get(`product/order/${id}`)
      .then((response) => {
        console.log(response.data.booking, "orderrrrrrrrrrrrrrrrrrr");
        setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  console.log(id,"singleeeeeeeee");
  console.log(order,"orderrrrrrrrrrrrrrrrrrrrrr");
 

  
  const cashcollected=()=>{
    var data={}
    data['status']='completed'
    api.patch(`product/order/${id}/`,data)
      .then((response) => {
        console.log(response.data, "orderrrrrrrrrrrrrrrrrrr");
        setCash(false)
        navigate(-1)
        // setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const handledelevery=()=>{
    var data={}
    if (order.collected==false){
      // data["collected"]=true
      data['status']='in_progress'
      api.patch(`product/order/${id}/`,data)
      .then((response) => {
        console.log(response.data, "orderrrrrrrrrrrrrrrrrrr");
        navigate(-1)
        // setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
    else{
      data['status']='completed'
      if(order.booking.product_price===0){
        api.patch(`product/order/${id}/`,data)
      .then((response) => {
        console.log(response.data, "orderrrrrrrrrrrrrrrrrrr");
        navigate(-1)
        // setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      }else{
        setCash(true)
      }
    }
      }
    const handleCancel=()=>{
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      const result = window.confirm('Do you want to perform the task?')
      if (result) {
        data['status']='return'
      
        api.patch(`product/order/${id}/`,data)
      .then((response) => {
        console.log(response.data, "orderrrrrrrrrrrrrrrrrrr");
        // setOrder(response.data); // Update state with the response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      } 
    }

  return (
    <>
    <Dialog open={cash} >
        <DialogHeader>Cash</DialogHeader>
        <DialogBody divider>
         Collect ₹ {order?.booking?.product_price}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>setCash(false)}
            className="mr-1"
          >
            <span>No</span>
          </Button>
          <Button variant="gradient" color="green"
           onClick={cashcollected}
           >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    <Dialog
        open={scan}
        size={'xxl'}
        // handler={handleOpen}
        className='h-screen w-screen'
      >
        <Test  result={result} setResult={setResult}  setScan={setScan}/>
      </Dialog>
      {order === null ? (
        <div>Loading...</div>
      ) : (
        <div className='h-screen m-8 p-5 bg-white'>
          <div className='font-bold' >Costumer Name: <span className='font-black text-blue-500'>{order.booking.user.name}</span> </div>
          <div className='text-lg font-bold'>
            address:{order.collected ? 
              <span className='font-black text-blue-500'>{order.booking.to_address}</span> 
               : 
               <span className='font-black text-blue-500'> {order.booking.from_address}</span>
                }
                </div>
                <div className='my-2 space-y-5   bg-gray-300 block sm:flex sm:justify-between p-4'>
                  <div className='break-all '>{order.order_id}</div>
                  {order.collected ?
                    <div>Rs:{order.booking.product_price}</div>: null
                  }
              {!result.text ? (<div className='sm:space-x-0 space-x-2 md:space-y-2 space-y-0'><Button color='blue' onClick={()=>setScan(true)}>Verify</Button><Button onClick={handleCancel} color='red'>cancell</Button></div>) : (result.text === order.order_id ? <Button color='green'>Verifed</Button> : <div >Cancelled</div>)}
                        </div>
                        <QRCode className='sm:block hidden' size={70}  value={order.order_id}/>

                        <div className='fixed bottom-0 left-0 right-0'>

{
  result.text === order.order_id ? <Button className='w-full' onClick={handledelevery}>Conform</Button>: null
}
</div>
        </div>
      )}
    </>
  )
}

export default SingleOder



{/* <div className='h-screen  bg-white' >
          <div className='  space-y-5'>
            <div className='font-bold' >Costumer Name: <span className='font-black text-blue-500'>{order.booking.user.name}</span> </div>
            <div className='text-lg'>
            {order.collected ? 
              order.booking.to_address
               : 
                order.booking.from_address
                }
                </div>
                <div className='m-2 bg-gray-300 flex justify-between p-3'>
                  <div>{order.order_id}</div>
                  {order.collected ?
                    <div>Rs:{order.booking.product_price}</div>: null
                  }
              {!result.text ? (<div className='space-x-2'><Button color='blue' onClick={()=>setScan(true)}>Verify</Button><Button onClick={handleCancel} color='red'>cancell</Button></div>) : (result.text === order.order_id ? <Button color='green'>Verifed</Button> : <div >Cancelled</div>)}
                        </div>
            <QRCode className='m-10  mb-0' value={order.order_id}/>
          </div>
          
          <div className='fixed bottom-0 left-0 right-0'>

          {
            result.text === order.order_id ? <Button className='w-full' onClick={handledelevery}>Conform</Button>: null
          }
          </div>
        </div> */}
        