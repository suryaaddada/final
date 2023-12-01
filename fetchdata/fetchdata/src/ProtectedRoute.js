import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('result') === 'Authorized';

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
