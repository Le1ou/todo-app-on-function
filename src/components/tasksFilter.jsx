import React from "react";

function TasksFilter({ status, filtered }) {
  return (
    <>
      <li>
        <button className={status === "all" ? "selected" : ""} onClick={() => filtered("all")}>
          All
        </button>
      </li>
      <li>
        <button className={status === "active" ? "selected" : ""} onClick={() => filtered("active")}>
          Active
        </button>
      </li>
      <li>
        <button className={status === "completed" ? "selected" : ""} onClick={() => filtered("completed")}>
          Completed
        </button>
      </li>
    </>
  );
}
export default TasksFilter;
