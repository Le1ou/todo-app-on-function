import React from "react";

import Task from "./task";

function TaskList({ todos, onToogleCheck, deleteTodo, editSubmit, handleTimer, setTodoData}) {
  const tasks = todos.map((task) => {
    const { id, ...taskProps } = task;
    return (
      <Task
        key={id}
        id={id}
        props={taskProps}
        handleTimer={() => handleTimer(id)}
        deleteTodo={() => deleteTodo(id)}
        onToogleCheck={() => onToogleCheck(id)}
        editSubmit={(value) => editSubmit(id, value)}
        setTodoData={setTodoData}
      />
    );
  });

  return <>{tasks}</>;
}

export default TaskList;
