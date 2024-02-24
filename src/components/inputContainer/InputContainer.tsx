import { useState } from "react";
import { useAddTodosMutation } from "../../store/api/apiSlice";
import styles from "./InputContainer.module.css";
import { Form, Input, Button, message, Dropdown, MenuProps } from "antd";
import uuid from "react-uuid";
import { useForm } from "antd/es/form/Form";

interface Form {
  textField?: string;
}

export const InputContainer = () => {
  // const editedTodo = useTypedSelector((state) => state.todos.edit);
  const [bgColor, setBgColor] = useState<string>("blue");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Red",
    },
    {
      key: "2",
      label: "Blue",
    },
    {
      key: "3",
      label: "Green",
    },
    {
      key: "4",
      label: "Violet",
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState("");
  const [addTodo] = useAddTodosMutation();
  const [form] = useForm();

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

  const onFinish = (values: unknown) => {
    console.log("Success:", values);
    if (!value) {
      errorMessage();
      return;
    }

    const obj = {
      id: uuid(),
      title: value,
      done: false,
    };

    addTodo(obj);

    successMessage();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
    errorMessage();
  };

  return (
    <div className={styles.input_container}>
      {contextHolder}
      <Form
        form={form}
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="filled"
            placeholder="Add your todo"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ backgroundColor: bgColor }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
