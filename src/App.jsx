import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './modules/user/pages/Home';
import Booking from './modules/user/pages/Booking';
import AdminLogin from './modules/admin/pages/Login'
import HomeAdmin from './modules/admin/pages/Home';
import HubAdmin from './modules/hub_admin/pages/Home'
import HubAdminLogin from './modules/hub_admin/pages/Login'
import Profile from './modules/user/pages/profile';
import Loader from './modules/user/components/Loader';
import Loginoffice from './modules/office/page/Login';
import Homeoffice from './modules/office/page/Home';
import Logindelevery from './modules/delevery/page/Login';
import Homedelevery from './modules/delevery/page/Home';
export default function App() {
  
  return (
    <>
    <Routes>
            
      <Route path='/' element={<Home/>}/>
      <Route path='booking/' element={<Booking/>}></Route>
      <Route path='hub/*' element={<HubAdmin/>}></Route>
      <Route path='hubadminlogin/' element={<HubAdminLogin/>}></Route>
      <Route path='admin/*' index element={<HomeAdmin/>}></Route>
      <Route path='login/' element={<AdminLogin/>}></Route>
      <Route path='profile/' element={<Profile/>}></Route>
      <Route path='loader/' element={<Loader/>}></Route>
      <Route path='deleverylogin/' element={<Logindelevery/>}/>
      <Route path='delevery/*' element={<Homedelevery/>} />
      <Route path='officelogin/' element={<Loginoffice/>}/>
      <Route path='office/*' element={<Homeoffice/>} />
    </Routes>
    
    </>

  );
}
