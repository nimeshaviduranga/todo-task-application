package com.todo.task.backend.service;

import com.todo.task.backend.model.Task;
import com.todo.task.backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task1;
    private Task task2;

    @BeforeEach
    void setUp() {
        task1 = Task.builder()
                .id(1L)
                .title("Test Task 1")
                .description("Test Description 1")
                .createdAt(LocalDateTime.now())
                .completed(false)
                .build();

        task2 = Task.builder()
                .id(2L)
                .title("Test Task 2")
                .description("Test Description 2")
                .createdAt(LocalDateTime.now().minusDays(1))
                .completed(false)
                .build();
    }

    @Test
    void getRecentTasks_ShouldReturnListOfTasks() {
        // Arrange
        List<Task> expectedTasks = Arrays.asList(task1, task2);
        when(taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc()).thenReturn(expectedTasks);

        // Act
        List<Task> actualTasks = taskService.getRecentTasks();

        // Assert
        assertEquals(expectedTasks.size(), actualTasks.size());
        assertEquals(expectedTasks, actualTasks);
        verify(taskRepository, times(1)).findTop5ByCompletedFalseOrderByCreatedAtDesc();
    }

    @Test
    void createTask_ShouldSaveAndReturnTask() {
        // Arrange
        Task newTask = Task.builder()
                .title("New Task")
                .description("New Description")
                .build();

        Task savedTask = Task.builder()
                .id(1L)
                .title("New Task")
                .description("New Description")
                .createdAt(LocalDateTime.now())
                .completed(false)
                .build();

        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        // Act
        Task result = taskService.createTask(newTask);

        // Assert
        assertNotNull(result);
        assertEquals(savedTask.getId(), result.getId());
        assertEquals(savedTask.getTitle(), result.getTitle());
        assertEquals(savedTask.getDescription(), result.getDescription());
        assertFalse(result.isCompleted());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void completeTask_ShouldMarkTaskAsCompleted() {
        // Arrange
        when(taskRepository.findById(task1.getId())).thenReturn(Optional.of(task1));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Task result = taskService.completeTask(task1.getId());

        // Assert
        assertTrue(result.isCompleted());
        verify(taskRepository, times(1)).findById(task1.getId());
        verify(taskRepository, times(1)).save(task1);
    }

    @Test
    void completeTask_ShouldThrowExceptionWhenTaskNotFound() {
        // Arrange
        Long nonExistentId = 999L;
        when(taskRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> taskService.completeTask(nonExistentId));
        verify(taskRepository, times(1)).findById(nonExistentId);
        verify(taskRepository, never()).save(any(Task.class));
    }
}