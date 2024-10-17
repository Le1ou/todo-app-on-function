import { useEffect, useState } from "react";
import NewTaskForm from "./newTaskForm";
import TaskList from "./taskList";
import Footer from "./footer";

export type TodoItem = {
  id: string;
  label: string;
  hours: string;
  sec: string;
  min: string;
  date: number;
  check: boolean;
  status: "all" | "active" | "completed";
  edit: boolean;
  editText: string;
  isPaused: boolean;
  timer: number;
};

type timeInput = string | number;

function App() {
  const [todoData, setTodoData] = useState<TodoItem[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoItem[]>([]);
  const [status, setStatus] = useState<"all" | "active" | "completed">("all");
  const [label, setLabel] = useState<string>("");
  const [sec, setSec] = useState<timeInput>("");
  const [min, setMin] = useState<timeInput>("");

  function createItem(label: string, hours: string, sec: string, min: string): TodoItem {
    const numberHours = Number(hours);
    const numberSeconds = Number(sec);
    const numberMinutes = Number(min);
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
      timer: (numberHours * 3600 + numberSeconds * 60 + numberMinutes) * 1000,
    };
  }

  const handleTimer = (id: string) => {
    setTodoData(prevData => prevData.map(el => el.id === id ? {...el, isPaused : !el.isPaused} : el));
  };

  useEffect(() => {
    setTodoFilter(todoData);
  }, [todoData]);

  const autoCorrectDate = (min: timeInput, sec: timeInput) => {
    let minutes = parseInt(String(min)) || 0;
    let seconds = parseInt(String(sec)) || 0;
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return { hours, minutes, seconds };
  };

  const createTodo = (label: string, sec: string, min: string) => {
    const { hours: correctedHours, minutes: correctedMinutes, seconds: correctedSeconds } = autoCorrectDate(min, sec);
    const totalMilliseconds = (correctedHours * 3600 + correctedMinutes * 60 + correctedSeconds) * 1000;
    const newTodo = createItem(label, String(correctedHours), String(correctedSeconds), String(correctedMinutes));
    newTodo.timer = totalMilliseconds;
    setTodoData((prevData) => [...prevData, newTodo]);
    setStatus("all");
  };

  const onCheckData = () => {
    const isValidNumber = (value: string) => value === "" || /^[0-9]+$/.test(value);
    const trimmedMin = String(min).trim();
    const trimmedSec = String(sec).trim();
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

  const onToogleCheck = (id: string) => {
    setTodoData((prevData) => prevData.map((el) => (el.id === id ? { ...el, check: !el.check } : el)));
    setStatus("all");
  };

  const deleteTodo = (id: string) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  };

  const handleSecChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSec(evt.target.value);
  };

  const handleMinChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMin(evt.target.value);
  };

  const editSubmit = (id: string, value: string) => {
    setTodoData((prevData) => prevData.map((el) => (el.id === id ? { ...el, label: value } : el)));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (label.trim() === "") {
      return;
    }
    autoCorrectDate(min, sec);
    if (!onCheckData()) {
      return;
    }
    createTodo(label, String(sec), String(min));
    setLabel("");
    setMin("");
    setSec("");
  };

  const filtered = (status: "all" | "active" | "completed") => {
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
        <NewTaskForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSecChange={handleSecChange}
          handleMinChange={handleMinChange}
          label={label}
          min={min}
          sec={sec}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            deleteTodo={deleteTodo}
            todos={todoFilter}
            onToogleCheck={onToogleCheck}
            editSubmit={editSubmit}
            handleTimer={handleTimer}
            setTodoData={setTodoData}
          />
        </ul>
        <Footer completed={completed} clearData={clearData} filtered={filtered} status={status} />
      </section>
    </section>
  );
}

export default App;