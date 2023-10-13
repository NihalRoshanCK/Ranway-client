import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  
  const user = localStorage.getItem('role');

  

  return  user==="admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/adminlogin" />
  );
}

export default AdminProtectedRoute;
