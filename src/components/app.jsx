import React, { useEffect, useState } from "react";
import NewTaskForm from "./newTaskForm";
import TaskList from "./taskList";
import Footer from "./footer";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todoFilter, setTodoFilter] = useState([]);
  const [status, setStatus] = useState("all");
  const [label, setLabel] = useState("");
  const [hours, setHours] = useState("")
  const [sec, setSec] = useState("");
  const [min, setMin] = useState("");

  function createItem(label, hours, sec, min) {
    return {
      id: Math.random().toString(36).slice(2),
      label,
      hours,
      sec,
      min,
      date: Date.now(),
      check: false,
      status: "all",
      edit: false,
      editText: label,
      isPaused: true,
      timer: (hours * 3600 + min * 60 + sec) * 1000,
    };
  }

  const handleTimer = (id) => {
    setTodoData(prevData => prevData.map(el => el.id === id ? {...el, isPaused : !el.isPaused} : el))}

  useEffect(() => {
    setTodoFilter(todoData);
  }, [todoData]);

  const createTodo = (label, hours, sec, min) => {
    const { hours: correctedHours, minutes: correctedMinutes, seconds: correctedSeconds } = autoCorrectDate(min, sec);
    const totalMilliseconds = (correctedHours * 3600 + correctedMinutes * 60 + correctedSeconds) * 1000;
    const newTodo = createItem(label, correctedHours, correctedSeconds, correctedMinutes);
    newTodo.timer = totalMilliseconds;
    setTodoData((prevData) => [...prevData, newTodo]);
    setStatus("all");
  };

  const autoCorrectDate = (min, sec) => {
    let minutes = parseInt(min) || 0;
    let seconds = parseInt(sec) || 0;
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return { hours, minutes, seconds };
  }

  const onCheckData = () => {
    const isValidNumber = (value) => value === "" || /^[0-9]+$/.test(value);
    const trimmedMin = min.trim();
    const trimmedSec = sec.trim();
    if (!isValidNumber(trimmedMin) && !isValidNumber(trimmedSec)) {
      alert("Both values must be numbers.");
      return false;
    } else if (!isValidNumber(trimmedMin)) {
      alert("The value of min must be a number.");
      return false;
    } else if (!isValidNumber(trimmedSec)) {
      alert("The value of sec must be a number.");
      return false;
    }
    return true;
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

  const handleSecChange = (evt) => {
    setSec(evt.target.value)
  }

  const handleMinChange = (evt) => {
    setMin(evt.target.value)
  }

  const editSubmit = (id, value) => {
    setTodoData((prevData) => prevData.map((el) => (el.id === id ? { ...el, label: value } : el)));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (label.trim() === "") {
      return;
    }
    autoCorrectDate(min, sec);
    if (!onCheckData()) {
      return;
    }
    createTodo(label, hours, sec, min);
    setLabel("");
    setMin("");
    setSec("");
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
      <header className="header">
          <h1>todos</h1>
          <NewTaskForm handleSubmit={handleSubmit} handleChange={handleChange} setLabel={setLabel} handleSecChange={handleSecChange} handleMinChange={handleMinChange} label={label} min={min} sec={sec}/>
        </header>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            createTodo={createTodo}
            deleteTodo={deleteTodo}
            todos={todoFilter}
            onToogleCheck={onToogleCheck}
            editSubmit={editSubmit}
            handleTimer={handleTimer}
            setTodoData={setTodoData}
          />
        </ul>
        <Footer completed={completed} clearData={clearData} filtered={filtered} status={status}/>
      </section>
    </section>
  );
}

export default App;
