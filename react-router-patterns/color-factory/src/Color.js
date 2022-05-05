import React from 'react';
import './Color.css';
import { Link } from 'react-router-dom';

const Color = ({ color, hex }) => {

  const backgroundColor = color === 'white' ? 'black' : 'white';

  return (
    <div style={{ backgroundColor }}className="Color">
      <h1 style={{color: hex }}>{color}</h1>
      <Link style={{color: hex }} to="/colors">Go Back</Link>
    </div>
  );
};

export default Color;