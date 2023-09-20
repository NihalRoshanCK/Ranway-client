import React,{useEffect,useState} from 'react'
import Sheet from '../components/Sheet';
import api from '../deleveryaxiosInterceptor';
function SheetList() {
    const [worksheet,setWorksheet]=useState([])
    useEffect(() => {
        (async()=>{
          api.get(`product/worksheet/get_self_worksheet/`).then((response)=>{
            console.log(response.data);
            setWorksheet(response.data)
        })
        })();
        },[]);
  return (
    <>
         {worksheet.map((item)=>(
      <div className='m-10'>
        <Sheet item={item} />
      </div>

    ))

    } 
    </>
  )
}

export default SheetList
