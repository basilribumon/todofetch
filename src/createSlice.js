import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  return response.json();
};

function Todos() {
  const [showCompleted, setShowCompleted] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  const filteredTodos = showCompleted
    ? data.filter((todo) => todo.completed)
    : data;

  return (
    <div>
      <h1>Todo List</h1>

      <button
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {showCompleted ? "Show All" : "Show Completed"}
      </button>

      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          <p>
            <strong>{todo.title}</strong>
          </p>
          <p>Completed: {todo.completed ? "✅ Yes" : "❌ No"}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Todos;