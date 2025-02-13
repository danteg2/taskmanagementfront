import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { task_user } from '../services/apirest';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      const fetchUsers = async () => {
        try {
            const userid = localStorage.getItem('userid');
            const request_body={"token":token,"userid":userid};
            const response = await task_user(request_body);
            console.log(response);
            if (response && response.data) {
                setUsers(response.data);
              } else {
                console.error("No users found in response");
              }
        } catch (error) {
          console.error('Failed to fetch users', error);
        }
      };
      fetchUsers();
    }
  }, [navigate]);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.description}</li>
        ))}
      </ul>
    </div>
  );
};

/*function Logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirige a la página de login
  }*/

export default UserList;