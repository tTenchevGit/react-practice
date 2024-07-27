import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const ProtectedRoute = () => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;