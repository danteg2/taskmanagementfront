import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login_api } from '../services/apirest';
import { TextField, Button, Typography, Container } from '@mui/material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request_body = { "username": username, "password": password };
      const response = await login_api(request_body);
      if (response.status === 200) {
        login(response.data.token, response.data.userid);
        if (response.data.role.includes("ROLE_ADMIN")) {
          navigate('/user');
        } else {
          navigate('/task');
        }
      } else {
        setError(response.message || "Inicio de sesión fallido");
      }
    } catch (err) {
      setError('Hubo un error en el inicio de sesión');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: 1 }}
        >
          Iniciar sesión
        </Button>
      </form>
    </Container>
  );
};

export default Login;
