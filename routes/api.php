<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TaskController;

Route::middleware('auth:sanctum')->group(function () {
    //Para User
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    // Tareas para usuario
    Route::get('/users/{user}/tasks', [TaskController::class, 'index']);
    Route::post('/users/{user}/tasks', [TaskController::class, 'store']);

    // Tarea gestion
    Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});