import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

export interface TodosObject {
  id: string;
  title: string;
}

export interface TodosState {
  todos: TodosObject[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodosObject[]>) => {
      state.todos = action.payload;
    },
  },
});

export const getTodos = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      console.log(data);
      dispatch(setTodos(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postTodos = (todoObj: object) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(todoObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(getTodos());
    } catch (error) {
      console.error(error);
    }
  };
};

export const { setTodos } = todosSlice.actions;
