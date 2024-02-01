import { useEffect } from "react";
import styles from "./TodosContainer.module.css";
import { getTodos } from "../../store/features/todos/todosSlice";
import { useTypeDispatch, useTypedSelector } from "../../store/store";

export const TodosContainer = () => {
  const todos = useTypedSelector(({ todos }) => todos.todos);
  console.log(todos);
  const dispatch = useTypeDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className={styles.full_container}>
      <div className={styles.todos_container}>
        {todos.map((todo) => {
          console.log(todo.title);
          return (
            <p className={styles.todo_item} key={todo.id}>
              {todo.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};