import styles from "./TodosContainer.module.css";
import { useTypedSelector } from "../../store/store";
import {
  Todo,
  useDeleteTodosMutation,
  useGetTodosQuery,
} from "../../store/api/apiSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Typography, Flex } from "antd";
import { CSSProperties } from "react";

export const TodosContainer = () => {
  const { Title } = Typography;
  const todos = useTypedSelector(({ todos }) => todos.todos);
  console.log(todos);
  const [deleteTodo] = useDeleteTodosMutation();
  const { data } = useGetTodosQuery();
  console.log(data);

  const boxStyles: CSSProperties = {
    backgroundColor: "bisque",
    padding: "10px",
    width: "100%",
    borderRadius: "12px",
    margin: "10px",
  };

  return (
    <Flex className={styles.full_container}>
      <Flex className={styles.todos_container}>
        {data?.map((todo: Todo) => (
          <Flex
            style={boxStyles}
            justify="space-between"
            align="center"
            key={todo.id}
          >
            <Title level={5} className={styles.todo_item}>
              {todo.title}
            </Title>
            <Button onClick={() => deleteTodo({ id: todo.id })}>
              <DeleteOutlined />
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
