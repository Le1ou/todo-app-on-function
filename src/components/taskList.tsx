import Task from "./task";
import { TodoItem } from "./app";

interface TaskListProps {
  todos: TodoItem[];
  onToogleCheck: (id: string) => void;
  deleteTodo: (id: string) => void;
  editSubmit: (id: string, value: string) => void;
  handleTimer: (id: string) => void;
  setTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

function TaskList({ todos, onToogleCheck, deleteTodo, editSubmit, handleTimer, setTodoData}: TaskListProps) {
  const tasks = todos.map((task: TodoItem) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        props={task}
        handleTimer={() => handleTimer(task.id)}
        deleteTodo={() => deleteTodo(task.id)}
        onToogleCheck={() => onToogleCheck(task.id)}
        editSubmit={(value: string) => editSubmit(task.id, value)}
        setTodoData={setTodoData}
      />
    );
  });

  return <>{tasks}</>;
}

export default TaskList;
