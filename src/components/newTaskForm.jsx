import React from "react";

function NewTaskForm({ handleChange, label }) {
  return (
    <input
      className="new-todo"
      type="text"
      placeholder="What needs to be down?"
      onChange={handleChange}
      value={label}
      autoFocus
    />
  );
}

export default NewTaskForm;
