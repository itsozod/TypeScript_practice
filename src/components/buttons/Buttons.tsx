import { Button, Flex, Input } from "antd";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
// import { ChangeEvent, useState } from "react";

export const Buttons = () => {
  const options = [
    {
      label: "15d",
      comission: 2,
    },
    {
      label: "1m",
      comission: 4,
    },
    {
      label: "2m",
      comission: 6,
    },
    {
      label: "3m",
      comission: 8,
    },
    {
      label: "6m",
      comission: 13,
    },
    {
      label: "9m",
      comission: 18,
    },

    {
      label: "13m",
      comission: 23,
    },
    {
      label: "18m",
      comission: 34,
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
      label: "15d",
      comission: 2,
      amount: 0,
      value: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue("value", value);
    const res = (Number(value) * formik.values.comission) / 100;
    const perMonth = Number(value) + res;
    formik.setFieldValue("amount", perMonth);
  };

  const handleClick = (label: string, comission: number) => {
    formik.handleChange({ target: { name: "label", value: label } });
    formik.handleChange({ target: { name: "comission", value: comission } });

    const res = (Number(formik.values.value) * comission) / 100;
    const perMonth = Number(formik.values.value) + res;

    formik.setFieldValue("amount", perMonth);
  };
  console.log("formik", formik.values);

  return (
    <>
      <Flex justify="center" align="center">
        <Flex style={{ width: "500px", margin: "10px" }}>
          {options.map((option) => {
            return (
              <Button
                key={option.label}
                onClick={() => handleClick(option.label, option.comission)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "30px",
                  alignItems: "center",
                  background:
                    formik.values.label === option.label ? "green" : "white",
                }}
              >
                <div>{option.label}</div>
                <div>{option.comission}%</div>
              </Button>
            );
          })}
        </Flex>
      </Flex>

      <Input
        name="value"
        value={formik.values.value}
        onChange={handleChange}
        placeholder="Enter the value"
      />

      <Flex style={{ width: "100%", flexDirection: "column" }}>
        <Flex justify="space-around">
          <div>Duration</div>
          <div>{formik.values.label}</div>
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
