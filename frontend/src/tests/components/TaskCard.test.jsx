import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../../components/TaskCard/TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description'
  };

  test('renders task information correctly', () => {
    render(<TaskCard task={mockTask} onComplete={jest.fn()} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('calls onComplete when Done button is clicked', () => {
    const mockOnComplete = jest.fn();
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} />);

    const doneButton = screen.getByTestId(`done-button-${mockTask.id}`);
    fireEvent.click(doneButton);

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  test('renders nothing if task data is invalid', () => {
    const { container } = render(<TaskCard task={null} onComplete={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test('handles task without description', () => {
    const taskWithoutDescription = {
      id: 2,
      title: 'No Description Task'
    };

    render(<TaskCard task={taskWithoutDescription} onComplete={jest.fn()} />);

    expect(screen.getByText('No Description Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});