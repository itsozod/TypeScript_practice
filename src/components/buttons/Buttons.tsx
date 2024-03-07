import { Button, Flex, Form, Input } from "antd";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
// import { ChangeEvent, useState } from "react";

export const Buttons = () => {
  const options = [
    {
      label: "15d",
      comission: 2,
      duration: 15,
      time: "дней",
    },
    {
      label: "1m",
      comission: 4,
      duration: 1,
      time: "месяц",
    },
    {
      label: "2m",
      comission: 6,
      duration: 2,
      time: "месяца",
    },
    {
      label: "3m",
      comission: 8,
      duration: 3,
      time: "месяца",
    },
    {
      label: "6m",
      comission: 13,
      duration: 6,
      time: "месяцев",
    },
    {
      label: "9m",
      comission: 18,
      duration: 9,
      time: "месяцев",
    },

    {
      label: "13m",
      comission: 23,
      duration: 13,
      time: "месяцев",
    },
    {
      label: "18m",
      comission: 34,
      duration: 18,
      time: "месяцев",
    },
  ];
  // const [btnOptions, setBtnOptions] = useState({
  //   btn: "15d",
  //   comission: 2,
  // });
  // const [money, setMoney] = useState(0);
  // const [value, setValue] = useState("");

  // const handleBtn = (label: string, comission: number) => {
  //   setBtnOptions((prev) => ({
  //     ...prev,
  //     btn: label,
  //     comission: comission,
  //   }));
  //   const res = (Number(value) * comission) / 100;
  //   const perMonth = Number(value) + res;
  //   setMoney(perMonth);
  // };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setValue(value);
  //   const res = (Number(value) * btnOptions.comission) / 100;
  //   const perMonth = Number(value) + res;
  //   setMoney(perMonth);
  // };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: "",
      comission: "",
      amount: "",
      value: "",
      duration: "",
      time: "дней",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange({ target: { name: "value", value: value } });
    // if (formik.values.duration === 15) {
    //   const res = (Number(value) * formik.values.comission) / 100;
    //   const perMonth = Number(value) + res;
    //   formik.setFieldValue("amount", perMonth);
    // } else {
    const res = (Number(value) * Number(formik.values.comission)) / 100;
    const perMonth = Number(value) + res;
    // / Number(formik.values.duration);
    formik.setFieldValue("amount", Math.ceil(perMonth));
    // }
  };

  const handleClick = (
    label: string,
    comission: number
    // duration: number,
    // time: string
  ) => {
    formik.handleChange({ target: { name: "label", value: label } });
    formik.handleChange({ target: { name: "comission", value: comission } });
    // formik.handleChange({ target: { name: "duration", value: duration } });
    // formik.handleChange({ target: { name: "time", value: time } });

    // if (duration === 15) {
    //   const res = (Number(formik.values.value) * comission) / 100;
    //   const perMonth = Number(formik.values.value) + res;

    //   formik.setFieldValue("amount", perMonth);
    // } else {
    const res = (Number(formik.values.value) * comission) / 100;
    const perMonth = Number(formik.values.value) + res;
    // / duration;
    formik.setFieldValue("amount", Math.ceil(perMonth));
    // }
  };
  console.log("formik", formik.values);

  return (
    <>
      <Flex justify="center" align="center">
        <Flex style={{ width: "500px", margin: "10px" }}>
          <Form onFinish={formik.handleSubmit} layout="vertical">
            {options.map((option) => {
              return (
                <Form.Item>
                  <Button
                    key={option.label}
                    onClick={() =>
                      handleClick(
                        option.label,
                        option.comission
                        // option.duration,
                        // option.time
                      )
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "30px",
                      alignItems: "center",
                      background:
                        formik.values.label === option.label
                          ? "green"
                          : "white",
                    }}
                  >
                    <div>{option.label}</div>
                    <div>{option.comission}%</div>
                  </Button>
                </Form.Item>
              );
            })}
            <Form.Item>
              <Input
                name="value"
                // type="number"
                value={formik.values.value}
                onChange={handleChange}
                placeholder="Enter the value"
              />
            </Form.Item>
          </Form>
        </Flex>
      </Flex>

      <Flex style={{ width: "100%", flexDirection: "column" }}>
        <Flex justify="space-around">
          <div>Duration</div>
          <div>
            {formik.values.duration} {formik.values.time}
          </div>
        </Flex>
        <Flex justify="space-around">
          <div>Comission</div>
          <div>{formik.values.comission}%</div>
        </Flex>
        <Flex justify="space-around">
          <div>Per Month</div>
          <div>{formik.values.amount}</div>
        </Flex>
      </Flex>
    </>
  );
};
