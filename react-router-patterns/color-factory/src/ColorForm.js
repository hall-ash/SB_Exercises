import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ColorForm.css';

const ColorForm = ({ setColors }) => {

  const INITIAL_FORM = ({
    color: '',
    hex: '#ffffff'
  });

  const [form, setForm] = useState(INITIAL_FORM);
  const history = useHistory();

  const handleChange = evt => {
    setForm(form => ({ ...form, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setColors(colors => ({ [form.color.toLowerCase()]: form.hex, ...colors }))
    history.push('/colors');
  };

  return (
    <form className="ColorForm" onSubmit={handleSubmit}>
      <label htmlFor="color">Color name:</label>
      <input className="ColorForm-name-input" type="text" id="color" name="color" onChange={handleChange} />
      <label htmlFor="hex">Color hex:</label>
      <input type="color" id="hex" name="hex" onChange={handleChange} />
      <button>Add</button>
    </form>
  );
};

export default ColorForm;