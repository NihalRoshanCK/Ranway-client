import React from 'react';
import { Navigate } from 'react-router-dom';

function HUbAdminProtuctedRoute({ children }) {
  
  const user = localStorage.getItem('role');

  

  return  user==="hub_admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/hubadminlogin" />
  );
}

export default HUbAdminProtuctedRoute;