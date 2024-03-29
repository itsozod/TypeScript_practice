import styles from "./TodosContainer.module.css";
import {
  Todo,
  useCheckTodosMutation,
  useDeleteTodosMutation,
  useEditTodosMutation,
  useGetTodosQuery,
} from "../../store/api/apiSlice";
import {
  CheckOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Typography, Flex, Input } from "antd";
import { CSSProperties, useState } from "react";

export const TodosContainer = () => {
  const [editedTodo, setEditedTodo] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const { Title } = Typography;
  // const todos = useTypedSelector(({ todos }) => todos.todos);
  const [deleteTodo] = useDeleteTodosMutation();
  const [editTodos] = useEditTodosMutation();
  const [checkTodo] = useCheckTodosMutation();
  const { data } = useGetTodosQuery();

  const cardStyles: CSSProperties = {
    backgroundColor: "bisque",
    padding: "10px",
    width: "100%",
    borderRadius: "12px",
    margin: "10px",
    gap: "5px",
  };
  const buttonContainer: CSSProperties = {  
    gap: "5px",
  };

  const specificTodo = (title: string, id: string) => {
    setEditedTodo(id);
    setValue(title);
  };

  const addEditedTodo = (todo: Todo) => {
    editTodos({ ...todo, title: value });
    setEditedTodo(null);
  };

  return (
    <>
      <Flex className={styles.full_container}>
        <Flex className={styles.todos_container}>
          {data?.map((todo: Todo) => (
            <Flex
              style={cardStyles}
              justify="space-between"
              align="center"
              key={todo.id}
            >
              {editedTodo === todo.id ? (
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                ></Input>
              ) : (
                <Title
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => checkTodo({ ...todo, done: !todo.done })}
                  level={5}
                  className={styles.todo_item}
                >
                  {todo.title}
                </Title>
              )}
              <Flex style={buttonContainer}>
                {editedTodo === todo.id ? (
                  <>
                    <Button onClick={() => setEditedTodo(null)}>
                      <CloseCircleOutlined />
                    </Button>
                    <Button onClick={() => addEditedTodo(todo)}>
                      <CheckOutlined />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => specificTodo(todo.title, todo.id)}>
                      <EditOutlined />
                    </Button>
                    <Button onClick={() => deleteTodo({ id: todo.id })}>
                      <DeleteOutlined />
                    </Button>
                  </>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
};
