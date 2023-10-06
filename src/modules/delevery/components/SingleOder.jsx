import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
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
         Collect {order?.booking?.product_price}
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
      >
        <Test  result={result} setResult={setResult}  setScan={setScan}/>
      </Dialog>
    {order === null ? (
        <div>Loading...</div>
      ) : (
        <div >
          <div className='space-y-5'>
            <div className='font-bold' >Costumer Name: <span className='font-black text-blue-500'>{order.booking.user.name}</span> </div>
            <div className='text-lg'>
            {order.collected ? 
              order.booking.to_address
               : 
                order.booking.from_address
                }
                </div>
                <div className='bg-blue-gray-500 flex justify-between p-3'>
                  <div>{order.order_id}</div>
                  {order.collected ?
                    <div>Rs:{order.booking.product_price}</div>: null
                  }
              {!result.text ? (<div className='space-x-2'><Button color='blue' onClick={()=>setScan(true)}>Verify</Button><Button onClick={handleCancel} color='red'>cancell</Button></div>) : (result.text === order.order_id ? <Button color='green'>Verifed</Button> : <div >Cancelled</div>)}
                        </div>
            {/* <p>{result?.text}</p> */}
            <QRCode className='m-10' value={order.order_id}/>
          </div>
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
