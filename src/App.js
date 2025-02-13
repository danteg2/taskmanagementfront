import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Login</Link> | <Link to="/users">User List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;