import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import '../../styles/TaskList.css';

const TaskList = ({ tasks, onCompleteTask }) => {
  if (!tasks || !Array.isArray(tasks)) {
    return <p className="error-message">Error: Invalid task data</p>;
  }

  return (
    <div className="task-list" data-testid="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks" data-testid="no-tasks">No tasks to display</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={() => onCompleteTask(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;