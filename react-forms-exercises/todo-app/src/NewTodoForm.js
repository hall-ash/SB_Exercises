import React, {useState} from 'react';

const NewTodoForm = ({addTodo}) => {
  const [todoInput, setTodoInput] = useState('');

  const handleChange = evt => {
    setTodoInput(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo(todoInput);
    setTodoInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">Todo:</label>
      <input type="text" id="todo" name="todo" onChange={handleChange} value={todoInput}/><br></br>
      <button>Add</button>
    </form>
  )

}

export default NewTodoForm;