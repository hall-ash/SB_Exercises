import React from 'react';
import './Dog.css'
import { Link } from 'react-router-dom'; 

const Dog = ({ name, src }) => {

  return (
    <div className="Dog">
      {src && <img src={src} alt={name} />} 
      <div><Link to={`dogs/${name.toLowerCase()}`}>{name}</Link></div>
    </div>
  );
};

export default Dog;