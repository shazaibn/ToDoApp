import React, { useState } from "react";
import './App.css';
import Todolist from "./components/TodoList";

import client from './client';


// async function loadTodos() {
//   let stream = await client.invoke('list', {});
//   let output = await stream.next();
//   console.log(output);
// }

// loadTodos();

function App() {

  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <p>ToDo list</p>
        <Todolist />

      </header>
    </div>
  );
}

export default App;
