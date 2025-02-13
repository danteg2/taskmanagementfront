import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';
import { user_list_api, user_register_api, user_update_api, user_delete_api} from '../services/apirest';
import styles from '../css/styles';

const rolesList = [
  { id: 1, name: 'ROLE_ADMIN' },
  { id: 2, name: 'ROLE_USER' }
];

const User = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ fullname: '', username: '', email: '', password: '', roles: [] });
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await user_list_api(token);
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setNewUser({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      password: '',
      roles: user.roles.map(role => ({ id: role.id, name: role.name }))
    });
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await user_delete_api(token, userId);
      if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
      }
      const usersData = await user_list_api(token);
      setUsers(usersData);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };
  

  const handleRegisterUser = () => {
    setOpenDialog(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewUser({ fullname: '', username: '', email: '', password: '', roles: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoles = e.target.value.map(id => rolesList.find(role => role.id === id));
    setNewUser({ ...newUser, roles: selectedRoles });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      let response;
      if (editMode && selectedUser) {
          response = await user_update_api(token, selectedUser.id, newUser); // Asumiendo que `user_register_api` también soporta edición
      } else {
        response = await user_register_api(token, newUser);
      }
      if (response.ok) {
        setOpenDialog(false);
        setNewUser({ fullname: '', username: '', email: '', password: '', roles: [] });
        setEditMode(false);
        setSelectedUser(null);
        const usersData = await user_list_api(token);
        setUsers(usersData);
      } else {
        console.error('Error al procesar usuario');
      }
    } catch (error) {
      console.error('Error al procesar usuario:', error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '10px' }}>
          <Button variant="contained" onClick={handleRegisterUser} style={styles.button}>
            Registrar Usuario
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {loading ? (
        <div>Cargando Usuarios...</div>
      ) : (
        <div style={styles.tableContainer}>
          <TableContainer component={Paper} style={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleEdit(user)} 
                      style={styles.actionButton}>
                      Editar
                    </Button>
                      <Button 
                        variant="outlined" 
                        onClick={() => handleDelete(user.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

<Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>Registrar Usuario</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre Completo"
          name="fullname"
          value={newUser.fullname}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <FormControl fullWidth style={{ marginBottom: 10 }}>
          <InputLabel>Roles</InputLabel>
          <Select
            label="Roles"
            multiple
            name="roles"
            value={newUser.roles.map(role => role.id)}
            onChange={handleRoleChange}
            renderValue={(selected) => 
              selected.map(id => rolesList.find(role => role.id === id)?.name).join(', ')
            }
          >
            {rolesList.map(role => (
              <MenuItem key={role.id} value={role.id}>
                <Checkbox checked={newUser.roles.some(r => r.id === role.id)} />
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default User;
