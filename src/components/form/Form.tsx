import styles from "./Form.module.css";
import { Form, Button, Input, message, Typography } from "antd";

type FieldType = {
  username?: string;
  password?: string;
};

const { Title } = Typography;
export const FormContainer = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Account registered successfully!",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Fill the inputs!",
    });
  };

  const onFinish = (values: unknown ) => {
    console.log("Success:", values);
    successMessage();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
    errorMessage();
  };
  return (
    <div className={styles.form_container}>
      {contextHolder}
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title level={2}>Sign Up</Title>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          className={styles.form_item}
        >
          <Input
            className={styles.input}
            variant="filled"
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          className={styles.form_item}
        >
          <Input.Password
            className={styles.input}
            variant="filled"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className={styles.form_input}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
