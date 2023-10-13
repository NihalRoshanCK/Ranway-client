import React from 'react';
import { Navigate } from 'react-router-dom';

function UserProtectedRoute({ children }) {
  
  const user = localStorage.getItem('role');

  

  return  user==="user" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
    
  );
}

export default UserProtectedRoute;