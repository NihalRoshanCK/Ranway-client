import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// import Hub from '../components/Hub';
// import { useSelector, useDispatch } from 'react-redux'
import Orders from '../components/Orders';
import SeeAllNotifications from '../components/SeeAllNotifications';
import Chat from '../components/Chat';
import HubDash from '../components/HubDash';
import Profile from '../components/Profile';
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
      <div className="flex min-h-screen w-full  max-h-fit bg-blue-gray-50  pb-5">
    

        <Sidebar/>
          
        <div  className= "w-full  lg:ml-0 transition-all ease-in-out">
          <Navbar  />
          <Routes>
              <Route path='' element={<HubDash/>}/>
              <Route path='huborder'  element={<Orders/>}/>
              <Route path='notifications'  element={<SeeAllNotifications/>}/>
              <Route path='chat'  element={<Chat/>}/>
              <Route path='profile'  element={<Profile/>}/>


              
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
