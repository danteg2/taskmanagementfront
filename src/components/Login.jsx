import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_api } from '../services/apirest';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const request_body={"username":username,"password":password};
        const response = await login_api(request_body);
        console.log(response);
        if (response.status===200) {
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('userid', response.data.userid);
            localStorage.setItem('role', response.data.role); 
            navigate('/users');
        } else {
            alert(response.message!=null ? response.message : "Inicio de sesión fallido");
        }
    } catch (error) {
      alert('Proceso fallido', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
