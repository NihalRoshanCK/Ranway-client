import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../deleveryaxiosInterceptor';
import {
    Card,
  } from "@material-tailwind/react";
function SheetDetail() {
    const [order,setOrder]=useState([])
    useEffect(() => {
        (async()=>{
          api.get(`product/worksheet/${id}`).then((response)=>{
            console.log(response.data);
            setOrder(response.data)
        })
        })();
        },[]);
    const {id}=useParams();
    console.log(id,"iddddddddddddddddddddddddddddd");
  return (
    <>
    {/* {
        order.map((item)=>(

    <Card color='red'>
        hi
    </Card>
        ))
    } */}
    </>
  )
}

export default SheetDetail
