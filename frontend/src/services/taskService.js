import axios from 'axios';

/**
 * Service for interacting with the tasks API
 */
const taskService = {
  /**
   * Get the most recent tasks
   * @returns {Promise} Promise containing task data
   */
  getRecentTasks: () => {
    return axios.get('/api/tasks');
  },

  /**
   * Create a new task
   * @param {Object} task - The task object
   * @param {string} task.title - The task title
   * @param {string} task.description - The task description
   * @returns {Promise} Promise containing the created task
   */
  createTask: (task) => {
    return axios.post('/api/tasks', task);
  },

  /**
   * Mark a task as complete
   * @param {number} id - The task ID
   * @returns {Promise} Promise containing the updated task
   */
  completeTask: (id) => {
    return axios.put(`/api/tasks/${id}/complete`);
  }
};

export default taskService;