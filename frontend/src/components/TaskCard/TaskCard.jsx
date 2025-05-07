import React from 'react';
import '../../styles/TaskCard.css';

const TaskCard = ({ task, onComplete }) => {
  if (!task || !task.id || !task.title) {
    return null;
  }

  return (
    <div className="task-card" data-testid={`task-card-${task.id}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <button
        className="done-button"
        onClick={onComplete}
        data-testid={`done-button-${task.id}`}
        aria-label={`Mark ${task.title} as complete`}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;