import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string;
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
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodos: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo, // Make sure to stringify the body if necessary
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodosMutation,
  useEditTodosMutation,
} = todosApi;
