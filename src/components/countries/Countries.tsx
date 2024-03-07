import { Button, Flex, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import styles from "./Countries.module.css";

// import * as XLSX from "xlsx";

const tableColumns = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "population",
    name: "Population",
  },
];

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [specCountry, setSpecCountry] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
        console.log(data);
        console.log(data[0].name.common);
      } catch (e) {
        console.log(e);
      }
    };
    getCountries();
  }, []);

  const getSpecificCountry = async (e) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${e}`);
      const data = await res.json();
      const mappedData = data.map((country) => ({
        name: country.name.common,
        population: country.population,
      }));
      setSpecCountry(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  // const exportExcel = async () => {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(specCountry);
  //   console.log(ws);
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet");
  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };

  const exportExcel = () => {
    const header = tableColumns.map((column) => column.name).join(";");
    console.log(header);

    const body = specCountry
      .map((country) =>
        tableColumns.map((column) => country[column.key]).join(";")
      )
      .join("\n");

    const csvContent = `${header}\n${body}`;
    const blob = new Blob([csvContent], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Countries.csv";
    link.click();
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography.Title style={{ textAlign: "center" }}>
          Countries
        </Typography.Title>
        <Flex justify="center">
          <Select placeholder="Choose a country" onChange={getSpecificCountry}>
            {countries?.map((country) => {
              return (
                <Select.Option
                  key={country.name.common}
                  value={country.name.common}
                >
                  {country.name.common}
                </Select.Option>
              );
            })}
          </Select>
        </Flex>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableColumns.map((column) => {
                return (
                  <>
                    <th key={column.key}>{column.name}</th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {specCountry?.map((country) => {
                return (
                  <>
                    <td>{country.name}</td>
                    <td>{country.population}</td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
        <Button onClick={() => exportExcel()}>Export this sheet</Button>
        <input
          onChange={(e) => console.log(e.target.files)}
          type="file"
          placeholder="File"
        />
      </div>
    </>
  );
};
