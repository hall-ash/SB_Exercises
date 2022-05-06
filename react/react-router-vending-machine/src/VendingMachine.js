import React from 'react';
import { Link } from 'react-router-dom';
import './VendingMachine.css';

const VendingMachine = () => {

  
  return (
    <div className="VendingMachine" >
      <h1>Choose a snack</h1>
      <div className="VendingMachine-links">
        <Link to="/soda">Soda</Link>
        <Link to="/candy">Candy</Link>
        <Link to="/chips">Chips</Link>
      </div>
    </div>
  );
};

export default VendingMachine;