import React, {useState} from 'react';
import './BoxList.css';
import NewBoxForm from './NewBoxForm';
import Box from './Box';
import { v4 as uuid } from 'uuid';

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = boxTraits => {
    const newBox = { ...boxTraits, id: uuid(), }
    setBoxes(boxes => [...boxes, newBox]);
  };

  const deleteBox = id => {
    const newBoxes = boxes.filter(box => box.id !== id);
    setBoxes(newBoxes);
  };

  const boxComponents = boxes.map(({bgColor, width, height, id}) => {
    return (
    <Box key={id} 
         bgColor={bgColor} 
         width={width} 
         height={height} 
         deleteBox={() => deleteBox(id)}/>);
  });

  return (
    <div>
      <h2>BoxList: </h2>
      {boxes.length ? <ul>{boxComponents}</ul> : <p>Box list is empty</p>}
      <h3>Add a new box:</h3>
      <NewBoxForm addBox={addBox}/>
    </div>
  );
};

export default BoxList;