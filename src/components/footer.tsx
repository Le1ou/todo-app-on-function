import TasksFilter from "./tasksFilter";

interface FooterProps {
  completed: number;
  status: "all" | "active" | "completed";
  clearData: () => void;
  filtered: (status: "all" | "active" | "completed") => void;
}

function Footer({ completed, status, clearData, filtered }: FooterProps) {
  return (
    <footer className="footer">
      <span className="todo-count">{completed} items left</span>
      <ul className="filters">
        <TasksFilter status={status} filtered={filtered} />
      </ul>
      <button className="clear-completed" onClick={clearData}>
        Clear Completed
      </button>
    </footer>
  );
}

export default Footer;
