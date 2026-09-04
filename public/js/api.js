let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

export async function apiRequest(url, options = {}) {
  
  const response = await fetch(`/api${url}`, {
    ...options,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
    },
    
});

    const data = await response.json();

    if (!response.ok) {
        throw {status: response.status,data};
    }

    return data;
}

export async function getUsers() {
    return apiRequest('/users');
}

export async function getUserTasks(userId) {
    return apiRequest(`/users/${userId}/tasks`);
}

export async function createTask(userId, taskData) {
    return apiRequest(`/users/${userId}/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
    });
}

export async function completeTask(taskId) {
    return apiRequest(`/tasks/${taskId}/complete`, {
        method: 'PATCH',
    });
}

export async function deleteTask(taskId) {
    return apiRequest(`/tasks/${taskId}`, {
        method: 'DELETE',
    });
}