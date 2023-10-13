import React from 'react';
import { Navigate } from 'react-router-dom';

function OfficeStaffProtuctedRoute({ children }) {
  
  const user = localStorage.getItem('role');

  

  return  user==="office_staff" ? (
    <>{children}</>
  ) : (
    <Navigate to="/officelogin" />
  );
}

export default OfficeStaffProtuctedRoute;