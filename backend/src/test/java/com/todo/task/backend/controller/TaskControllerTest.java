package com.todo.task.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.task.backend.model.Task;
import com.todo.task.backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void getRecentTasks_ShouldReturnTasks() throws Exception {
        // Arrange
        List<Task> tasks = Arrays.asList(task1, task2);
        when(taskService.getRecentTasks()).thenReturn(tasks);

        // Act & Assert
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("Test Task 1")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].title", is("Test Task 2")));
    }

    @Test
    void createTask_ShouldCreateAndReturnTask() throws Exception {
        // Arrange
        Task newTask = Task.builder()
                .title("New Task")
                .description("New Description")
                .build();

        Task createdTask = Task.builder()
                .id(3L)
                .title("New Task")
                .description("New Description")
                .createdAt(LocalDateTime.now())
                .completed(false)
                .build();

        when(taskService.createTask(any(Task.class))).thenReturn(createdTask);

        // Act & Assert
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newTask)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.title", is("New Task")))
                .andExpect(jsonPath("$.description", is("New Description")))
                .andExpect(jsonPath("$.completed", is(false)));
    }

    @Test
    void createTask_ShouldReturnBadRequestForInvalidInput() throws Exception {
        // Arrange
        Task invalidTask = Task.builder()
                .title("")  // Empty title should trigger validation failure
                .description("Description")
                .build();

        // Act & Assert
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidTask)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void completeTask_ShouldMarkTaskAsCompleted() throws Exception {
        // Arrange
        Task completedTask = Task.builder()
                .id(1L)
                .title("Test Task 1")
                .description("Test Description 1")
                .createdAt(LocalDateTime.now())
                .completed(true)
                .build();

        when(taskService.completeTask(1L)).thenReturn(completedTask);

        // Act & Assert
        mockMvc.perform(put("/api/tasks/1/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.completed", is(true)));
    }

    @Test
    void completeTask_ShouldReturnNotFoundForNonExistentTask() throws Exception {
        // Arrange
        when(taskService.completeTask(anyLong())).thenThrow(new EntityNotFoundException("Task not found"));

        // Act & Assert
        mockMvc.perform(put("/api/tasks/999/complete"))
                .andExpect(status().isNotFound());
    }
}