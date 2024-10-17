interface NewTaskFormProps {
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  min: string | number;
  sec: string | number;
}

function NewTaskForm({ handleSubmit, handleChange, handleSecChange, handleMinChange, label, min, sec }: NewTaskFormProps) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
      <input className="new-todo" onChange={handleChange} type="text" value={label} placeholder="Task" autoFocus />
      <input className="new-todo-form__timer" onChange={handleMinChange} type="text" value={min} placeholder="Min" />
      <input className="new-todo-form__timer" onChange={handleSecChange} type="text" value={sec} placeholder="Sec" />
    </form>
  );
}

export default NewTaskForm;
