import {
    createTask,
    deleteTask,
    completeTask,
    getUsers,
    getUserTasks,
    setAccessToken,
} from './api.js';

import {
    renderUsers,
} from './users.js';

import {
    renderTasks,
} from './task-list.js';

const tokenSection = document.querySelector('#token-section');
const mainApp = document.querySelector('#main-app');
const tokenForm = document.querySelector('#token-form');
const tokenInput = document.querySelector('#token');
const tokenButton = document.querySelector('#obtener-tareas');
const tokenMsg = document.querySelector('#token-msg');
const tasksContent = document.querySelector('#tasks-content');
const addTaskForm = document.querySelector('#add-task-form');
const taskTitleInput = document.querySelector('#new-task-title');
const taskDescriptionInput = document.querySelector('#new-task-description');
const addTaskButton = document.querySelector('#add-task-button');
const taskMessage = document.querySelector('#task-message');
const taskFilter = document.querySelector('#task-filter');
const taskOrder = document.querySelector('#task-order');

let selectedUser = null;
let currentTasks = [];

tokenForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = tokenInput.value.trim();

    if (!token) {
        showMessage('Ingresar un token valido.', 'danger');
        return;
    }

    await startApplication(token);
});

async function startApplication(token) {
    setAccessToken(token);

    tokenButton.disabled = true;
    tokenButton.textContent = 'Consultando...';

    try {
        const response = await getUsers();

        sessionStorage.setItem('api_token', token);

        renderUsers(response.data, handleUserSelected);

        tokenSection.classList.add('d-none');
        mainApp.classList.remove('d-none');
    } catch (error) {
        sessionStorage.removeItem('api_token');

        if (error.status === 401) {
            showMessage('El token no es válido.', 'danger');
        } else {
            console.log('Error al consultar la API');
            showMessage(
                'No fue posible la consulta.',
                'danger'
            );

            console.error(error);
        }
    } finally {
        tokenButton.disabled = false;
        tokenButton.textContent = 'Obtener tareas';
    }
}

async function handleUserSelected(user) {
    selectedUser = user;

    hideTaskMessage();

    await loadUserTasks(user);
}

async function loadUserTasks(user) {
    tasksContent.innerHTML = `
        <div class="text-center py-4">
            <div
                class="spinner-border text-primary"
                role="status"
            ></div>

            <p class="mt-2">Cargando tareas...</p>
        </div>
    `;

    try {
        const response = await getUserTasks(user.id);
        currentTasks = response.data;

        tasksContent.innerHTML = '';

        const title = document.createElement('h4');

        title.className = 'mb-4';
        title.textContent = `Tareas de ${user.name}`;

        const taskList = document.createElement('div');

        taskList.id = 'task-list';

        tasksContent.appendChild(title);
        tasksContent.appendChild(taskList);

        renderCurrentTasks();
    } catch (error) {
        tasksContent.innerHTML = `
            <div class="alert alert-danger">
                No fue posible consultar tareas.
            </div>
        `;

        console.error(error);
    }
}

function showMessage(message, type) {
    tokenMsg.textContent = message;
    tokenMsg.className = `alert alert-${type} mt-3`;
}

function showTaskMessage(message, type) {
    taskMessage.textContent = message;
    taskMessage.className = `alert alert-${type} mt-3`;
}

function hideTaskMessage() {
    taskMessage.classList.add('d-none');
}

const savedToken = sessionStorage.getItem('api_token');

if (savedToken) {
    tokenInput.value = savedToken;
    startApplication(savedToken);
}

addTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!selectedUser) {
        hideTaskMessage();

        showTaskMessage(
            'Primero debes seleccionar un usuario.',
            'warning'
        );

        return;
    }

    const taskData = {
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
    };

    addTaskButton.disabled = true;
    addTaskButton.textContent = 'Guardando...';

    try {
        await createTask(selectedUser.id, taskData);

        addTaskForm.reset();

        showTaskMessage(
            'Tarea creada correctamente.',
            'success'
        );

        await loadUserTasks(selectedUser);
    } catch (error) {
        if (error.status === 422) {
            const validationErrors = Object.values(
                error.data.errors
            ).flat();

            showTaskMessage(
                validationErrors.join(' '),
                'danger'
            );
        } else {
            showTaskMessage(
                'No fue posible crear la tarea.',
                'danger'
            );
        }

        console.error(error);
    } finally {
        addTaskButton.disabled = false;
        addTaskButton.textContent = 'Agregar tarea';
    }
});

async function handleCompleteTask(task) {
    try {
        await completeTask(task.id);

        showTaskMessage(
            'Tarea completada.',
            'success'
        );

        await loadUserTasks(selectedUser);
    } catch (error) {
        showTaskMessage(
            'No fue posible completar la tarea.',
            'danger'
        );

        console.error(error);
    }
}

async function handleDeleteTask(task) {
    const confirmed = window.confirm(
        `Deseas eliminar la tarea "${task.title}"?`
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteTask(task.id);

        showTaskMessage(
            'Tarea eliminada.',
            'success'
        );

        await loadUserTasks(selectedUser);
    } catch (error) {
        showTaskMessage(
            'No fue posible eliminar la tarea.',
            'danger'
        );

        console.error(error);
    }
}

function renderCurrentTasks() {
    const taskList = document.querySelector('#task-list');

    if (!taskList) {
        return;
    }

    let visibleTasks = [...currentTasks];

    if (taskFilter.value === 'pending') {
        visibleTasks = visibleTasks.filter((task) => {
            return !task.completed;
        });
    }

    if (taskFilter.value === 'completed') {
        visibleTasks = visibleTasks.filter((task) => {
            return task.completed;
        });
    }

    if (taskOrder.value === 'title') {
        visibleTasks.sort((firstTask, secondTask) => {
            return firstTask.title.localeCompare(
                secondTask.title,
                'es',
                {
                    sensitivity: 'base',
                }
            );
        });
    }

    if (taskOrder.value === 'date-desc') {
        visibleTasks.sort((firstTask, secondTask) => {
            return new Date(secondTask.created_at) -
                new Date(firstTask.created_at);
        });
    }

    if (taskOrder.value === 'date-asc') {
        visibleTasks.sort((firstTask, secondTask) => {
            return new Date(firstTask.created_at) -
                new Date(secondTask.created_at);
        });
    }

    renderTasks(
        visibleTasks,
        taskList,
        handleCompleteTask,
        handleDeleteTask
    );
}

taskFilter.addEventListener('change', () => {
    renderCurrentTasks();
});

taskOrder.addEventListener('change', () => {
    renderCurrentTasks();
});