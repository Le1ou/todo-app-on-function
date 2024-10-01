import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function Task({ props, deleteTodo, onToogleCheck, editSubmit }) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(props.label);

  const onSubmit = (evt) => {
    evt.preventDefault();
    editSubmit(editText);
    setEdit(false);
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
        <label onClick={onToogleCheck}>
          <span className="description">{props.label}</span>
          <span className="created">{timeAgo}</span>
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
