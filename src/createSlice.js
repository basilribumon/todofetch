import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );

    return response.json();
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },

    toggleTodo: (state, action) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })

      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch";
      });
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
} = todoSlice.actions;

export default todoSlice.reducer;