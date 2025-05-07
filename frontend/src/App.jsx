import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import taskService from './services/taskService';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskService.getRecentTasks();
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      await taskService.createTask(task);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again.");
    }
  };

  const completeTask = async (id) => {
    try {
      await taskService.completeTask(id);
      fetchTasks();
    } catch (error) {
      console.error(`Error completing task ${id}:`, error);
      setError("Failed to complete task. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="task-form-container">
        <TaskForm onAddTask={addTask} />
      </div>
      <div className="task-list-container">
        {isLoading ? (
          <p className="loading">Loading tasks...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <TaskList tasks={tasks} onCompleteTask={completeTask} />
        )}
      </div>
    </div>
  );
}

export default App;