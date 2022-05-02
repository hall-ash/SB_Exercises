import React from 'react';

const Box = ({bgColor, width, height, deleteBox}) => {
  const style = { 
    backgroundColor: `${bgColor}`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div>
      <li style={style}></li>
      <button onClick={deleteBox}>X</button>
    </div>
  );
};

export default Box;