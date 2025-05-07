import React, { useState } from 'react';
import '../../styles/TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  const validateTitle = (value) => {
    if (!value.trim()) {
      setTitleError('Title is required');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTitle(title)) {
      return;
    }

    onAddTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form" data-testid="task-form">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => validateTitle(e.target.value)}
            placeholder="Title"
            aria-required="true"
            aria-invalid={!!titleError}
            data-testid="title-input"
          />
          {titleError && <p className="error-message">{titleError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="5"
            data-testid="description-input"
          />
        </div>

        <button
          type="submit"
          className="add-button"
          data-testid="add-button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;