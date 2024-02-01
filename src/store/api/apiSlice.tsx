import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  title: string;
}

export const todosApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "http://localhost:3000/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodosMutation } = todosApi;
