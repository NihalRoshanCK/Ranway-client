import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
// import Hub from '../components/Hub';
import { useSelector, useDispatch } from 'react-redux'
import Orders from '../components/Orders';
// import { open } from '../../../Redux/StateReducer';


function Home() {
  const isOpen=useSelector((state) => state.counter.value)
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const refresh=localStorage.getItem('refresh')
  const access=localStorage.getItem('access')
  const role=localStorage.getItem('role')
if(role &&  refresh && access){
  return (
    <>
      <div className="flex bg-blue-gray-50">
    

        <Sidebar/>
          
        <div  className= "w-full lg:ml-0 transition-all ease-in-out p-5">
          <Navbar  />
          <Routes>
              <Route path='huborder' index element={<Orders/>}/>
              
          </Routes>
          <Outlet/>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}else{
  return <Navigate to='/hubadminlogin'/>
}
  
}

export default Home
