export function renderTasks(
    tasks,
    container,
    onComplete,
    onDelete
) {
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="alert alert-secondary mb-0">
                El usuario no tiene tareas registradas.
            </div>
        `;

        return;
    }

    tasks.forEach((task) => {
        const taskCard = document.createElement('div');

        taskCard.className = 'card mb-3';

        const statusClass = task.completed
            ? 'bg-success'
            : 'bg-warning text-dark';

        const statusText = task.completed
            ? 'Completada'
            : 'Pendiente';

        taskCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title"></h5>

                    <span class="badge ${statusClass}">
                        ${statusText}
                    </span>
                </div>

                <p class="card-text task-description"></p>

                <small class="text-muted">
                    Creada: ${formatDate(task.created_at)}
                </small>

                <div class="mt-3 task-actions"></div>
            </div>
        `;

        taskCard.querySelector('.card-title').textContent =
            task.title;

        taskCard.querySelector('.task-description').textContent =
            task.description;

        const actions = taskCard.querySelector('.task-actions');

        if (!task.completed) {
            const completeButton = document.createElement('button');

            completeButton.type = 'button';
            completeButton.className = 'btn btn-success btn-sm me-2';
            completeButton.textContent = 'Completar';

            completeButton.addEventListener('click', () => {
                onComplete(task);
            });

            actions.appendChild(completeButton);
        }

        const deleteButton = document.createElement('button');

        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';

        deleteButton.addEventListener('click', () => {
            onDelete(task);
        });

        actions.appendChild(deleteButton);
        container.appendChild(taskCard);
    });
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
}