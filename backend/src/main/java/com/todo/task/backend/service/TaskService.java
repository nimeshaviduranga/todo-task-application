package com.todo.task.backend.service;

import com.todo.task.backend.model.Task;

import java.util.List;

public interface TaskService {

    /**
     * Get the most recent incomplete tasks (up to 5)
     *
     * @return List of the most recent incomplete tasks
     */
    List<Task> getRecentTasks();

    /**
     * Create a new task
     *
     * @param task The task to create
     * @return The created task with generated ID
     */
    Task createTask(Task task);

    /**
     * Mark a task as complete
     *
     * @param id The task ID
     * @return The updated task
     */
    Task completeTask(Long id);
}