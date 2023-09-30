import React,{useEffect,useState} from 'react'

import Navbar from '../components/DeleveryNavbar';
import Sheet from '../components/sheet';
import api from '../deleveryaxiosInterceptor';
import { Routes,Route } from 'react-router-dom';
import SheetList from '../components/SheetList';
import SheetDetail from '../components/SheetDetail';
import SingleOder from '../components/SingleOder';
import Chat from '../components/Chat';
function Home() {
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
    <Navbar/>
    {/* {worksheet.map((item)=>(
      <div className='m-10'>
        <Sheet item={item} />
      </div>

    ))

    } */}
    <Routes>
      <Route path=''element={<SheetList/>}/>
      <Route path='sheet/:id'element={<SheetDetail/>}/>
      <Route path='/order/:id'element={<SingleOder/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
     
    </>
  )
}

export default Home
