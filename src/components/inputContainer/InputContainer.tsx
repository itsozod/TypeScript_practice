import { postTodos, setValue } from "../../store/features/todos/todosSlice";
import { useTypeDispatch, useTypedSelector } from "../../store/store";
import styles from "./InputContainer.module.css";
import { Form, Input, Button, message } from "antd";
import uuid from "react-uuid";

interface Form {
  textField?: string;
}

export const InputContainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const value = useTypedSelector((state) => state.todos.value);
  console.log(value);
  const dispatch = useTypeDispatch();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Todo awas added!",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Fill the inputs!",
    });
  };

  const onFinish = (values: string) => {
    console.log("Success:", values);
    successMessage();
    const obj = {
      id: uuid(),
      title: value,
    };
    console.log(obj);
    dispatch(postTodos(obj));
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
    errorMessage();
  };

  return (
    <div className={styles.input_container}>
      {contextHolder}
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<Form>
          rules={[{ required: true, message: "Please enter your todo!" }]}
          name={"textField"}
        >
          <Input
            onChange={(e) => dispatch(setValue(e.target.value))}
            variant="filled"
            placeholder="Add your todo"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
