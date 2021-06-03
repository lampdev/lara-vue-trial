<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use Carbon\Carbon;

class TodoController extends Controller
{
    /**
     * List Todos for only the authenticated user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return response()->json([
            'todos' => Todo::where('user_id', $request->user()->id)
                           ->get()
        ]);
    }

    /**
     * Create a new Todo for the authenticated user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $todo = Todo::create([
            'user_id' => $request->user()->id,
            'description' => $request->input('text'),
        ]);

        return response()->json($todo);
    }

    /**
     * Update a Todo for the authenticated user
     *
     * @param Request $request
     * @param $todoId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $todoId)
    {
        $todo = Todo::find($todoId);

        if (!$todo) {
            abort(404);
        }

        $todo->completed_at = Carbon::now();

        $todo->update();

        return response()->json([
            'todo' => $todo
        ]);
    }

    /**
     * Delete a Todo for the authenticated user
     *
     * @param Request $request
     * @param $todoId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $todoId)
    {
        $todo = Todo::find($todoId);

        if (!$todo) {
            abort(404);
        }

        $todo->delete();

        return response()->json([]);
    }
}
