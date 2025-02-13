import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = React.lazy(() => import('./components/Login'));
const User = React.lazy(() => import('./components/User'));
const Task = React.lazy(() => import('./components/Task'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path="/task" element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            } />
            <Route path="/" element={<User />} />
          </Routes>
        </Suspense>
    </AuthProvider>
  );
};

export default App;
