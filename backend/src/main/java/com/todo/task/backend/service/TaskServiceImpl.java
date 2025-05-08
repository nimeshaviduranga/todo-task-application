package com.todo.task.backend.service;

import com.todo.task.backend.model.Task;
import com.todo.task.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Task> getRecentTasks() {
        return taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc();
    }

    @Override
    @Transactional
    public Task createTask(Task task) {
        // Ensure new task is not marked as completed
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public Task completeTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));

        task.setCompleted(true);
        return taskRepository.save(task);
    }
}