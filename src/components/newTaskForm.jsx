import React from "react";

function NewTaskForm({ handleSubmit, handleChange, handleSecChange, handleMinChange, label, min, sec }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="new-todo-form" type="submit" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
      <input className="new-todo" onChange={handleChange} type="text" value={label} placeholder="Task" autoFocus />
      <input className="new-todo-form__timer" onChange={handleMinChange} type="text" value={min} placeholder="Min" />
      <input className="new-todo-form__timer" onChange={handleSecChange} type="text" value={sec} placeholder="Sec" />
    </form>
  );
}

export default NewTaskForm;
