import React, { useEffect, useState } from "react";

import NewTaskForm from "./newTaskForm";
import TaskList from "./taskList";
import Footer from "./footer";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todoFilter, setTodoFilter] = useState([]);
  const [status, setStatus] = useState("all");
  const [label, setLabel] = useState("");

  function createItem(label) {
    return {
      id: Math.random().toString(36).slice(2),
      label,
      date: Date.now(),
      check: false,
      status: "all",
      edit: false,
      editText: label,
    };
  }

  useEffect(() => {
    setTodoFilter(todoData);
  }, [todoData]);

  const createTodo = (label) => {
    const newTodo = createItem(label);
    setTodoData((prevData) => [...prevData, newTodo]);
    setStatus("all");
  };

  const onToogleCheck = (id) => {
    setTodoData((prevData) => prevData.map((el) => (el.id === id ? { ...el, check: !el.check } : el)));
    setStatus("all");
  };

  const deleteTodo = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const handleChange = (evt) => {
    setLabel(evt.target.value);
  };

  const editSubmit = (id, value) => {
    setTodoData((prevData) => prevData.map((el) => (el.id === id ? { ...el, label: value } : el)));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (label.trim() === "") {
      return;
    }
    createTodo(label);
    setLabel("");
  };

  const filtered = (status) => {
    setStatus(status);
    if (status === "all") {
      setTodoFilter(todoData);
    } else if (status === "active") {
      setTodoFilter(todoData.filter((el) => !el.check));
    } else if (status === "completed") {
      setTodoFilter(todoData.filter((el) => el.check));
    }
  };

  const clearData = () => {
    setTodoData((prevData) => prevData.filter((el) => !el.check));
    setTodoFilter((prevData) => prevData.filter((el) => !el.check));
    setStatus("all");
  };

  const completed = todoData.filter((el) => !el.check).length;

  return (
    <section className="todoapp">
      <form className="header" onSubmit={handleSubmit}>
        <h1>todos</h1>
        <NewTaskForm handleChange={handleChange} setLabel={setLabel} label={label} />
      </form>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            createTodo={createTodo}
            deleteTodo={deleteTodo}
            todos={todoFilter}
            onToogleCheck={onToogleCheck}
            editSubmit={editSubmit}
          />
        </ul>
        <Footer completed={completed} clearData={clearData} filtered={filtered} status={status} />
      </section>
    </section>
  );
}

export default App;
