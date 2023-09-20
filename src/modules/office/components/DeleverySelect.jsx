import api from '../officeaxiosInterceptor';
import React, { useState,useEffect} from 'react'
import { Select, Option } from "@material-tailwind/react";

function DeleverySelect(handleSelect) {
  const [items,setItems]=useState([])

  useEffect(() => {
            (async()=>{
                
                api.get(`hub/deliverystaff/`).then((response)=>{
                    console.log(response.data)
                    setItems(response.data)
                })
                
            })()
        }, []);

  return (
    <div className='pt-5'>
        <Select  onChange={()=>handleSelect} name='category' color="indigo" label="Category">
            {items.map((cat) => (
              <Option value={cat} >{cat["user"].name}</Option>
              ))}
          </Select>
    </div>
  )
}

export default DeleverySelect
