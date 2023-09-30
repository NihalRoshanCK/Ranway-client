import React from 'react'

import Table from '../components/Table';
import Navbar from '../components/OfficeNavbar';
import { Route, Routes } from 'react-router-dom';
import Asignorder from '../page/AsignOrder';
import Chat from '../components/Chat';
import Asignpickup from './Asignpickup';


function Home() {
 

  return (
    <>
    <Navbar/>
    

        
        <Routes>
        <Route path='' element={<Table/>}/>
        <Route path='/asign' element={<Asignorder/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/pickup' element={<Asignpickup/>}/>

        </Routes>
    </>
  )
}

export default Home
