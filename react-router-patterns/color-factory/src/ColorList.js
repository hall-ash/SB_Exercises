import React from 'react';
import { Link } from 'react-router-dom';
import './ColorList.css';

const ColorList = ({ colors }) => {

  const colorLinks = Object.keys(colors).map(color => 
    <Link style={{ color: colors[color]}} to={`/colors/${color.toLowerCase()}`}>{color}</Link>);

  return (
   <div className="ColorList">
     <h1>Please select a color.</h1>
     {colorLinks}
   </div>
  )
};

export default ColorList;