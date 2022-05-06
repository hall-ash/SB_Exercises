import React, {useState} from 'react';

const NewBoxForm = ({addBox}) => {

  const INITIAL_STATE = {
    bgColor: "",
    width: "",
    height: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addBox(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="bgColor">Background color:</label>
      <input type="text" id="bgColor" name="bgColor" onChange={handleChange} value={formData.bgColor}/><br></br>
      <label htmlFor="width">Width:</label>
      <input type="text" id="width" name="width" onChange={handleChange} value={formData.width}/><br></br>
      <label htmlFor="height">Height:</label>
      <input type="text" id="height" name="height" onChange={handleChange} value={formData.height}/><br></br>
      <button>Add</button>
    </form>
  );

};

export default NewBoxForm;
