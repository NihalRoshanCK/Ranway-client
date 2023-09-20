import React from 'react'

import Table from '../components/Table';
import Navbar from '../components/OfficeNavbar';
import { Route, Routes } from 'react-router-dom';
import Asignorder from '../page/AsignOrder';


function Home() {
 

  return (
    <>
    <Navbar/>
    

        
        <Routes>
        <Route path='' element={<Table/>}/>
        <Route path='/asign' element={<Asignorder/>}/>

        </Routes>
    </>
  )
}

export default Home
