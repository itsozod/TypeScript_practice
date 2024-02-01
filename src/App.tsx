import "./App.css";
// import { FormContainer } from "./components/form/Form";
import { InputContainer } from "./components/inputContainer/InputContainer";
import { TodosContainer } from "./components/todosContainer/TodosContainer";

function App() {
  return (
    <>
      {/* <FormContainer /> */}
      <div className="wrapper">
        <InputContainer />
        <TodosContainer />
      </div>
    </>
  );
}

export default App;
