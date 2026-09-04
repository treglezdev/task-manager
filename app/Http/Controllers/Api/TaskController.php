<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskManager;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskManager $taskManager
    ) {
    }

    public function index(User $user): JsonResponse
    {
        $tasks = $this->taskManager->listUserTasks($user);

        return response()->json([
            'data' => $tasks,
        ]);
    }

    public function store(
        StoreTaskRequest $request,
        User $user
    ): JsonResponse {
        $validated = $request->validated();

        $task = $this->taskManager->createTask(
            $user,
            $validated['title'],
            $validated['description']
        );

        return response()->json([
            'message' => 'Tarea creada exitosamente.',
            'data' => $task,
        ], 201);
    }

    public function complete(Task $task): JsonResponse
    {
        $task = $this->taskManager->completeTask($task);

        return response()->json([
            'message' => 'Tarea completada exitosamente.',
            'data' => $task,
        ]);
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json([
            'message' => 'Tarea eliminada exitosamente.',
               ]);
    }
}