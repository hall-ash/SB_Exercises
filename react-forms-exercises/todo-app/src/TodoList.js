import React, {useState} from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import { v4 as uuid } from 'uuid';

const TodoList = () => {
  const[todos, setTodos] = useState([]);

  const addTodo = name => {
    const newTodo = { name, id: uuid() }
    setTodos(todos => [...todos, newTodo]);
  };

  const deleteTodo = id => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  }

  const editTodo = (id, newName) => {
    const editedTodos = todos.map(todo => {
      return todo.id === id ? { ...todo, name: newName } : todo;
    });
    setTodos(editedTodos);
  }

  const todoComponents = todos.map(({ name, id }) => {
    return (
      <Todo key={id} 
            name={name} 
            deleteTodo={() => deleteTodo(id)}
            editTodo={editTodo}/>
    );
  });

  return (
    <div>
      <h2>Todos:</h2>
      {todos.length ? <ul>{todoComponents}</ul> : <p>No todos.</p>}
      <h3>Add a new todo:</h3>
      <NewTodoForm addTodo={addTodo}/>
    </div>
  );
};

export default TodoList;