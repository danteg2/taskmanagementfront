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

export const user_list_api = async (token) => {
    const API_BASE_URL = applicationproperties.API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'GET',
        mode: "cors",
        credentials: "include",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
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

export const user_register_api = async (token, newUserData) => {
    const API_BASE_URL = applicationproperties.API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        mode: "cors",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUserData)
    });

    if (!response.ok) {
        throw new Error('Error al registrar usuario');
    }
    return await response.json();
};

export const user_update_api = async (token, currentUserData) => {
    const API_BASE_URL = applicationproperties.API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'PUT',
        mode: "cors",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentUserData)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar usuario');
    }
    return await response.json();
};

export const user_delete_api = async (token, userid) => {
    const API_BASE_URL = applicationproperties.API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/users/`+userid, {
        method: 'DELETE',
        mode: "cors",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al Eliminar el usuario');
    }
    return await response.json();
};