<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Task Manager</title>
  </head>
  <body>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <h1 class="text-white">Task Manager</h1>
        </div>
    </nav>
    <div id="token-section" class="container-fluid d-flex justify-content-center mt-5">
        <div class="card w-50 text-center">
            <div class="card-header">
                Enlistar Tareas
            </div>
            <div class="card-body">
                <h5 class="card-title">Colocar Token para obtener tareas</h5>
                <form id="token-form">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="token" placeholder="Ingrese su token" required>
                    </div>
                    <button id="obtener-tareas" type="submit" class="btn btn-primary">Obtener Tareas</button>
                </form>
                <div id="token-msg" class="mt-3 d-none" role="alert"></div>
            </div>
        </div>
        
    </div>
    <div id="main-app" class="container-fluid d-none mt-5">
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        Usuarios
                    </div>
                    <div id="users-list" class="list-group list-group-flush">
    
                    </div>
                </div>
            </div>
            
            <div class="col-md-8">
                <div class="card">

                    <div class="card-header">
                        <div class="row align-items-end">
                            <div class="col-md-4">
                                <strong>Tareas</strong>
                            </div>

                            <div class="col-md-4">
                                <label for="task-filter" class="form-label">
                                    Filtrar
                                </label>

                                <select id="task-filter" class="form-select">
                                    <option value="all">Todas</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="completed">Completadas</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <label for="task-order" class="form-label">
                                    Ordenar
                                </label>

                                <select id="task-order" class="form-select">
                                    <option value="date-desc">
                                        Más recientes
                                    </option>

                                    <option value="date-asc">
                                        Más antiguas
                                    </option>

                                    <option value="title">
                                        Por título
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div id="tasks-content" class="card-body text-muted">
                        <h5 class="card-title">Seleccione un usuario para ver sus tareas</h5>
    
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <h2>Agregar Nueva Tarea</h2>
                <form id="add-task-form">
                    <div class="mb-3">
                        <label for="new-task-title" class="form-label">
                            Título
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="new-task-title"
                            maxlength="255"
                            required
                        >
                    </div>

                    <div class="mb-3">
                        <label for="new-task-description" class="form-label">
                            Descripción
                        </label>

                        <textarea
                            class="form-control"
                            id="new-task-description"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <button
                        id="add-task-button"
                        type="submit"
                        class="btn btn-success"
                    >
                        Agregar tarea
                    </button>

                    <div
                        id="task-message"
                        class="alert mt-3 d-none"
                        role="alert"
                    ></div>
                </form>
            </div>
        </div>
    </div>
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <script
        type="module"
        src="{{ asset('js/tasks.js') }}"
    ></script>
  </body>
</html>