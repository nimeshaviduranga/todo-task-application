import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../../components/TaskForm/TaskForm';

describe('TaskForm Component', () => {
  test('renders the form with all elements', () => {
    render(<TaskForm onAddTask={jest.fn()} />);

    expect(screen.getByText('Add a Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  test('validates that title is required', () => {
    render(<TaskForm onAddTask={jest.fn()} />);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });

  test('calls onAddTask when form is submitted with valid data', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm onAddTask={mockAddTask} />);

    const titleInput = screen.getByTestId('title-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description'
    });
  });

  test('clears input fields after successful submission', () => {
    render(<TaskForm onAddTask={jest.fn()} />);

    const titleInput = screen.getByTestId('title-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});