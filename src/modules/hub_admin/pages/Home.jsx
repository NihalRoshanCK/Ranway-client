import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// import Hub from '../components/Hub';
// import { useSelector, useDispatch } from 'react-redux'
import Orders from '../components/Orders';
import SeeAllNotifications from '../components/SeeAllNotifications';
import Chat from '../components/Chat';
// import { open } from '../../../Redux/StateReducer';


function Home() {
  // const isOpen=useSelector((state) => state.counter.value)
  // const dispatch = useDispatch();
  // const navigate =useNavigate();
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
              <Route path='notifications' index element={<SeeAllNotifications/>}/>
              <Route path='chat' index element={<Chat/>}/>


              
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
