import applicationproperties from '../applicationproperties'; 
export const login_api = async (credentials) => {
const API_BASE_URL = applicationproperties.API_BASE_URL;
const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
});
return await response.json();
};

export const task_user = async (credentials) => {
const API_BASE_URL = applicationproperties.API_BASE_URL;
const response = await fetch(`${API_BASE_URL}/api/users/`+credentials.userid+`/tasks`, {
    method: 'GET',
    mode: "cors",
    credentials: "include",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${credentials.token}`
    }
});
return await response.json();
};