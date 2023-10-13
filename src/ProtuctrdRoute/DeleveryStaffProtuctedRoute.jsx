import React from 'react';
import { Navigate } from 'react-router-dom';

function DeleveryStaffProtuctedRoute({ children }) {
  
  const user = localStorage.getItem('role');

  

  return  user==="delivery_staff" ? (
    <>{children}</>
  ) : (
    <Navigate to="/deleverylogin" />
  );
}

export default DeleveryStaffProtuctedRoute;