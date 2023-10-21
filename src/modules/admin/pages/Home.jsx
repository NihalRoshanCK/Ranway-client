import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom';
import AddHub from '../components/AddHub';
import Hub from '../components/Hub';
// import { useSelector, useDispatch } from 'react-redux'
// import { open } from '../../../Redux/StateReducer';
import AdminProfile from '../components/AdminProfile';
// import HubAdminDetailview from '../components/HubAdminDetailview';
// import HubAdminDetailview from '../components/Hubadmindetailview';
import HubDetailview  from  '../components/HubAdminDetailview'
import HubDetails from '../components/HubDetails';
import AdminDash from '../components/AdminDash';
import UserManagement from '../components/UserManagement';
import AddCategory from '../components/AddCategory';

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
      <div className="flex min-h-screen max-h-fit  bg-blue-gray-50  pb-5">
    

        <Sidebar/>
          
        <div  className= "w-full  lg:ml-0 transition-all ease-in-out">
          <Navbar  />
          <Routes>
              <Route path='' element={<AdminDash/>}/>
              <Route path='user'  element={<UserManagement/>}/>
              <Route path='hub'  element={<Hub/>}/>
              <Route path='addhub'  element={<AddHub/>} />
              <Route path='hubadmin/:id'  element={<HubDetailview/>} />
              <Route path='hubdetail/:id' element={<HubDetails/>} />
              <Route path='profile' element={<AdminProfile/>}/>
              <Route path='catogory' element={<AddCategory/>}/>

          </Routes>
          {/* <Outlet/> */}
          <div>
          </div>
        </div>
      </div>
    </>
  )
}else{
  return <Navigate to='/login'/>
}
  
}

export default Home
