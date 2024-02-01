import { configureStore } from "@reduxjs/toolkit";
// import { getTodos } from "./features/todos/todosSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todosSlice } from "./features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypeDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
