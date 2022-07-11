import React, {useState} from "react";
import './App.css';
import Todolist from "./components/TodoList";

function App() {

  const [todos,setTodos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <p>ToDo list</p>
        <Todolist/>
      </header>
    </div>
  );
}

export default App;
