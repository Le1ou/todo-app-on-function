import React from "react";

import TasksFilter from "./tasksFilter";

function Footer({ completed, status, clearData, filtered }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completed} items left</span>
      <ul className="filters">
        <TasksFilter status={status} filtered={filtered} />
      </ul>
      <button className="clear-completed" onClick={clearData}>
        Clear Completed
      </button>
    </footer>
  );
}

export default Footer;
