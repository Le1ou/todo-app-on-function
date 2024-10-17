import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { TodoItem } from "./app";

interface TaskProps {
  id: string;
  props: TodoItem;
  deleteTodo: (id: string) => void;
  onToogleCheck: (id: string) => void;
  editSubmit: (id: string) => void;
  handleTimer: (id: string) => void;
  setTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

function Task({ props, id, deleteTodo, onToogleCheck, editSubmit, handleTimer, setTodoData }: TaskProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(props.label);
  const [timer, setTimer] = useState<number>(props.timer || 86400000);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (!props.isPaused) {
      intervalId = setInterval(() => {
        setTimer(prevState => {
          if (prevState > 0 ) return prevState - 1000;
          return prevState;
        })
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [props.isPaused])

  useEffect(() => {
    console.log(`Timer for task ${id} updated to ${timer}`);
    setTodoData((prevState: TodoItem[]) =>
      prevState.map((el) => {
        if (el.id === id) {
          if (timer === 0) {
            console.log(`Task ${id} completed`);
            return { ...el, timer, check: true, isPaused: true };
          }
          return { ...el, timer };
        }
        return el;
      })
    );
  }, [timer, setTodoData, id]);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    editSubmit(editText);
    setEdit(false);
  };
  


  
  const handleToogleCheck = () => {
    onToogleCheck(id)
    if (props.check) {
      setTimer(86400000)
    }
  }
  const formatTime = (time: number) => {
    if (time > 86400000) {
      setTimer(86400000);
    }
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${(hours > 0 && hours !== 24) ? `${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  let className = props.check ? "completed" : "";
  if (edit && !props.check) {
    className = "editing";
  }
  const timeAgo = `created ${formatDistanceToNow(new Date(props.date), { addSuffix: true, includeSeconds: true })}`;

    return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={props.check} onClick={handleToogleCheck} readOnly />
        <label>
        <span className="title">
              {props.label}
          </span>

      {!props.check &&
      <span className="description">
              <button className="icon icon-play" onClick={() => handleTimer(id)} hidden={!props.isPaused}></button>
              <button className="icon icon-pause" onClick={() => handleTimer(id)} hidden={props.isPaused}></button>
              {formatTime(timer)}
            </span>
      }
            <span className="description">{timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={() => setEdit(!edit)}></button>
          <button className="icon icon-destroy" onClick={() => deleteTodo(id)}></button>
        </div>
      {edit && (
        <form onSubmit={onSubmit}>
          <input
            className="edit"
            type="text"
            onChange={(evt) => setEditText(evt.target.value)}
            value={editText}
            onBlur={() => setEdit(!edit)}
            autoFocus
          />
        </form>
      )}
    </li>
  );
}

export default Task;