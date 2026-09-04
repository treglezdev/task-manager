# Task Manager

Este aplicativo es una prueba técnica usando Laravel 12, MySQL, Blade, Bootstrap y JavaScript.

Permite seleccionar un usuario para consultar tareas, agregar nuevas, cambiar su estado a terminadas y/o eliminarlas. También se incluye las opciones de filtrado y ordenado.

## Instalación

Primero hay que clonar el repositorio:

```bash
git clone https://github.com/treglezdev/task-manager.git
cd tasks
```

Instalar las dependencias de Laravel:

```bash
composer install
```

Crear el archivo `.env` y generar la llave de la aplicación:

```bash
cp .env.example .env
php artisan key:generate
```

En el archivo `.env` se deben colocar los datos de la base de datos MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=193.203.166.25
DB_PORT=3306
DB_DATABASE=u968601890_task_manager
DB_USERNAME=u968601890_alexadmin
DB_PASSWORD=Al3x2026
```

Después se crean las tablas:

```bash
php artisan migrate
```

Se ejecuta el seeder para crear el usuario inicial y generar el token de acceso:

```bash
php artisan db:seed
```

El comando mostrará un token en la terminal. Ese token se debe copiar ya que se utiliza para ingresar a la aplicación.

Para iniciar el proyecto:

```bash
php artisan serve
```

Después se puede abrir en:

```text
http://127.0.0.1:8000
```

## Cómo está organizado

- `User` se utiliza para trabajar con los usuarios.
- `Task` se utiliza para trabajar con las tareas.
- Cada usuario puede tener varias tareas.
- Las validaciones están separadas en FormRequest.
- Los controladores reciben las solicitudes de la API.
- `TaskManager` se encarga de crear, completar y consultar tareas.
- Las rutas de la API están protegidas con Sanctum.
- La pantalla está realizada con Blade y Bootstrap.
- JavaScript consume la API usando fetch y async/await.
- El código JavaScript está dividido en diferentes archivos.

## Rutas de la API

Para utilizar estas rutas se necesita enviar el token de Sanctum.

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/users` | Consultar usuarios |
| POST | `/api/users` | Crear un usuario |
| GET | `/api/users/{user}/tasks` | Consultar tareas de un usuario |
| POST | `/api/users/{user}/tasks` | Crear una tarea |
| PATCH | `/api/tasks/{task}/complete` | Marcar una tarea como terminada |
| DELETE | `/api/tasks/{task}` | Eliminar una tarea |

## Funciones disponibles

- Mostrar la lista de usuarios.
- Seleccionar un usuario.
- Consultar sus tareas.
- Agregar tareas.
- Marcar tareas como terminadas.
- Eliminar tareas.
- Mostrar solamente tareas pendientes o terminadas.
- Ordenar las tareas por título o fecha.

## Pruebas

Para ejecutar las pruebas:

```bash
php artisan test
```