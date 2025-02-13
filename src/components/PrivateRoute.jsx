import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Verifica si el token está presente en el localStorage
  const token = localStorage.getItem('authToken');
  
  // Si no hay token, redirige a la página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, renderiza el contenido protegido
  return children;
}

export default PrivateRoute;

