import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './modules/user/pages/Home';
import Booking from './modules/user/pages/Booking';
import AdminLogin from './modules/admin/pages/Login'
import HomeAdmin from './modules/admin/pages/Home';
import HubAdmin from './modules/hub_admin/pages/Home'
import HubAdminLogin from './modules/hub_admin/pages/Login'
// import Profile from '../modules/user/pages/profile';
import Profile from '../src/modules/user/pages/Profile'
import Loader from './modules/user/components/Loader';
import Loginoffice from './modules/office/page/Login';
import Homeoffice from './modules/office/page/Home';
import Logindelevery from './modules/delevery/page/Login';
import Homedelevery from './modules/delevery/page/Home';
import AdminProtectedRoute from '../src/ProtuctrdRoute/AdminProtuctedRoute'
import HUbAdminProtuctedRoute from './ProtuctrdRoute/HUbAdminProtuctedRoute';
import OfficeStaffProtuctedRoute from './ProtuctrdRoute/OfficeStaffProtuctedRoute';
import DeleveryStaffProtuctedRoute from './ProtuctrdRoute/DeleveryStaffProtuctedRoute';
import UserProtectedRoute from './ProtuctrdRoute/UserProtuctedRoute';
export default function App() {
  
  return (
    <>
    <Routes>
            
      <Route path='/' element={<Home/>}/>
      <Route path='booking/' element={<UserProtectedRoute><Booking/></UserProtectedRoute>}></Route> 
      <Route path='profile/' element={<UserProtectedRoute><Profile/></UserProtectedRoute>}></Route>
     
      <Route path='adminlogin/' element={ <AdminLogin/>}></Route>
      <Route path='admin/*' index element={<AdminProtectedRoute><HomeAdmin/></AdminProtectedRoute>}></Route>

      <Route path='hub/*' element={<HUbAdminProtuctedRoute><HubAdmin/></HUbAdminProtuctedRoute>}></Route>
      <Route path='hubadminlogin/' element={<HubAdminLogin/>}></Route>

      <Route path='deleverylogin/' element={<Logindelevery/>}/>
      <Route path='delevery/*' element={<DeleveryStaffProtuctedRoute><Homedelevery/></DeleveryStaffProtuctedRoute>} />

      <Route path='officelogin/' element={<Loginoffice/>}/>
      <Route path='office/*' element={<OfficeStaffProtuctedRoute><Homeoffice/></OfficeStaffProtuctedRoute>} />

      <Route path='loader/' element={<Loader/>}></Route>

    </Routes>
    
    </>

  );
}
