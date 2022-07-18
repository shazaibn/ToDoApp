import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import client from '../client';

async function loadTodos() {
    let stream = await client.invoke('list',{});
    let output = await stream.next();
    console.log(output.items.value);
    return output.items.value
  }

async function addTodos(todo) {
let total = await client.invoke('add',{task:todo});
let output = await total.next();
console.log(output);
return output
}
  
  

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [stream,setStream] = useState(loadTodos());

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos]; // TODO: Call wasmflow component to update list with new item. 
        // Expected input :  todo(string)
        // Expected output: array(strings)
        addTodos(todo.text);
        setTodos(newTodos);
        console.log(todo, ...todos);
        console.log(stream);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))); // TODO: Call wasmflow component to update one specific task
        // Expected input(s): ID(int) and new todo(string)
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id); // TODO: Call wasmflow component to remove one specific task
        // Expected input: ID(int)
        // Expected output: length of array(int)?

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                // TODO: Ask Jarrod:
                // Leave js funcs and call wasmflow in func?
                // Or call wasmflow from here?

                removeTodo={removeTodo}
                completeTodo={completeTodo}
                updateTodo={updateTodo}
            />
        </>
    );
}

export default TodoList;