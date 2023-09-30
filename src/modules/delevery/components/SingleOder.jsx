import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../deleveryaxiosInterceptor';
import Test from './Scanner';
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
function SingleOder() {
  const { id } = useParams();
  const [order,setOrder]=useState(null)
//   const [result, setResult] = useState('No result');
const [result, setResult] = useState('No result');

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
  const handleVarify=()=>{
    setScan(true)
  }

  

  

  return (
    <>
    {order === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{order.booking.user.name}</div>
          {order.collected ? (
            <div>{order.booking.to_address}</div>
          ) : (
            <div>{order.booking.from_address}</div>
          )}

            {!result.text ? (<div onClick={handleVarify}>Verify</div>) : (result.text === order.order_id ? <div>Verifed</div> : <div>Cancelled</div>)}
      
          {scan ? <Test result={result} setResult={setResult}  setScan={setScan}/>:null}
          <p>{result?.text}</p>
          <QRCode value={order.order_id}/>
        </div>
      )}
    </>
  )
}

export default SingleOder
