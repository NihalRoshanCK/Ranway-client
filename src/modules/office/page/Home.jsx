import React from 'react'

import Table from '../components/Table';
import Navbar from '../components/OfficeNavbar';
import { Route, Routes } from 'react-router-dom';
import Asignorder from '../page/AsignOrder';
import Chat from '../components/Chat';
import Asignpickup from './Asignpickup';
import Category from '../components/Category';

function Home() {
 

  return (
    <>
    <Navbar/>
    

        
        <Routes>
        <Route path='' element={<Table/>}/>
        <Route path='/delevery' element={<Asignorder/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/pickup' element={<Asignpickup/>}/>
        <Route path='/collecting' element={<Category/>}/>


        </Routes>
    </>
  )
}

export default Home
