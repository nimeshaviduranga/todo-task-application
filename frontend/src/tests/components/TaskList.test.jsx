import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../../components/TaskList/TaskList';

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
  ];

  test('renders a list of tasks', () => {
    render(<TaskList tasks={mockTasks} onCompleteTask={jest.fn()} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('renders a message when no tasks are available', () => {
    render(<TaskList tasks={[]} onCompleteTask={jest.fn()} />);

    expect(screen.getByText('No tasks to display')).toBeInTheDocument();
  });

  test('handles invalid task data gracefully', () => {
    render(<TaskList tasks={null} onCompleteTask={jest.fn()} />);

    expect(screen.getByText('Error: Invalid task data')).toBeInTheDocument();
  });
});