import axios from 'axios';
import taskService from '../../services/taskService';

// Mock axios
jest.mock('axios');

describe('Task Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getRecentTasks calls the correct API endpoint', async () => {
    const mockResponse = { data: [{ id: 1, title: 'Test Task' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await taskService.getRecentTasks();
    
    expect(axios.get).toHaveBeenCalledWith('/api/tasks');
    expect(result).toEqual(mockResponse);
  });

  test('createTask sends correct data to API', async () => {
    const taskData = { title: 'New Task', description: 'Task Description' };
    const mockResponse = { data: { id: 1, ...taskData } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await taskService.createTask(taskData);
    
    expect(axios.post).toHaveBeenCalledWith('/api/tasks', taskData);
    expect(result).toEqual(mockResponse);
  });

  test('completeTask calls correct API endpoint with task ID', async () => {
    const taskId = 1;
    const mockResponse = { data: { id: taskId, completed: true } };
    axios.put.mockResolvedValue(mockResponse);

    const result = await taskService.completeTask(taskId);
    
    expect(axios.put).toHaveBeenCalledWith(`/api/tasks/${taskId}/complete`);
    expect(result).toEqual(mockResponse);
  });
});