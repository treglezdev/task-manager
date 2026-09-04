export function renderUsers(users, onUserSelected) {
    const usersList = document.querySelector('#users-list');

    usersList.innerHTML = '';

    if (users.length === 0) {
        usersList.innerHTML = `
            <div class="p-3 text-muted">
                No hay usuarios.
            </div>
        `;

        return;
    }

    users.forEach((user) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'list-group-item list-group-item-action';
        button.textContent = user.name;

        button.addEventListener('click', () => {
            removeActiveUser();
            button.classList.add('active');
            onUserSelected(user);
        });

        usersList.appendChild(button);
    });
}

function removeActiveUser() {
    const activeUser = document.querySelector(
        '#users-list .list-group-item.active'
    );

    if (activeUser) {
        activeUser.classList.remove('active');
    }
}