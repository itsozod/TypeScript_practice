import { Dropdown } from "antd";
import "./App.css";
import { Card } from "./components/cards/Card";
// import { FormContainer } from "./components/form/Form";
import { InputContainer } from "./components/inputContainer/InputContainer";
import { TodosContainer } from "./components/todosContainer/TodosContainer";

function App() {
  return (
    <>
      <div className="wrapper">
        <InputContainer />
        <TodosContainer />
      </div>
      <Card />
      {/* <Card /> */}
      {/* <Card /> */}
    </>
  );
}

export default App;
