import React from "react";

import Task from "./task";

function TaskList({ todos, onToogleCheck, deleteTodo, editSubmit }) {
  const tasks = todos.map((task) => {
    const { id, ...taskProps } = task;
    return (
      <Task
        key={id}
        props={taskProps}
        deleteTodo={() => deleteTodo(id)}
        onToogleCheck={() => onToogleCheck(id)}
        editSubmit={(value) => editSubmit(id, value)}
      />
    );
  });

  return <>{tasks}</>;
}

export default TaskList;
