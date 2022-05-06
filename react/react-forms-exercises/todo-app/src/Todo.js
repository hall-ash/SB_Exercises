import React, {useState} from 'react';
import './Todo.css';

const Todo = ({name, deleteTodo, editTodo, key}) => {
  const [newName, setNewName] = useState(name);
  const [beingEdited, setBeingEdited] = useState(false);

  const handleChange = evt => setNewName(evt.target.value);

  const toggleEdit = () => {
    setBeingEdited(edit => !edit);
  };

  const handleEdit = evt => {
    evt.preventDefault();
    editTodo(key, newName);
    toggleEdit();
  };

  return beingEdited ? 
    <div>
      <form onSubmit={handleEdit}>
        <input type="text" value={newName} onChange={handleChange} />
        <button>Save</button>
      </form>
    </div> :
   <div className="Todo-item">
      <li>{newName}</li>
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={deleteTodo}>X</button>
   </div>
  ;
};

export default Todo;