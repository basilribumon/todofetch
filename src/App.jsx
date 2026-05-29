import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "./createSlice";

function App() {
  const dispatch = useDispatch();

  const { todos, loading, error } =
    useSelector((state) => state.todo);

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div style={{ textAlign: "center"}}>
      <h1>Todo App</h1>

      <input
        type="text"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />
       <button onClick={handleAdd}>
        Add
      </button>

      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}

      {todos.map((todo) => (
        <div key={todo.id}>
          <p
            onClick={() =>
              dispatch(toggleTodo(todo.id))
            }
            style={{
              cursor: "pointer",
              textDecoration: todo.completed
                ? "line-through"
                : "none",
            }}
          >
            {todo.title}
          </p>

          <button
            onClick={() =>
              dispatch(deleteTodo(todo.id))
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;