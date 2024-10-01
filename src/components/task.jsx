import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

function Task({ props, deleteTodo, onToogleCheck, editSubmit }) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(props.label);
  const [isPaused, setIsPaused] = useState(true);
  const [timer, setTimer] = useState(props.timer);
  const [intervalId, setIntervalId] = useState(null);

  const handleTimer = () => {
    setIsPaused(prevState => !prevState)
  }

  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(() => {
        setTimer(prevState => {
            if(prevState <= 0) {
              clearInterval(id)
              setIsPaused(prevState => !prevState);
              setTimer(86400000);
              return props.check = true;
            }
          return prevState - 1000;
        })
      }, 1000)
      setIntervalId(id);

      return () => clearInterval(id)
    }
    else if (intervalId) clearInterval(intervalId)
  }, [isPaused])

  const onSubmit = (evt) => {
    evt.preventDefault();
    editSubmit(editText);
    setEdit(false);
  };
  
  const formatTime = (time) => {
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
        <input className="toggle" type="checkbox" checked={props.check} onClick={onToogleCheck} readOnly />
        <label>
        <span className="title">
              {props.label}
          </span>

      {!props.check &&
      <span className="description">
              <button className="icon icon-play" onClick={handleTimer} hidden={!isPaused}></button>
              <button className="icon icon-pause" onClick={() => setIsPaused(!isPaused)} hidden={isPaused}></button>
              {formatTime(timer)}
            </span>
      }
            <span className="description">{timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={() => setEdit(!edit)}></button>
          <button className="icon icon-destroy" onClick={deleteTodo}></button>
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
