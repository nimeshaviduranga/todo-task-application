package com.todo.task.backend.repository;

import com.todo.task.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Find the 5 most recent incomplete tasks ordered by creation date (newest first)
     *
     * @return List of the 5 most recent incomplete tasks
     */
    @Query("SELECT t FROM Task t WHERE t.completed = false ORDER BY t.createdAt DESC LIMIT 5")
    List<Task> findTop5ByCompletedFalseOrderByCreatedAtDesc();
}