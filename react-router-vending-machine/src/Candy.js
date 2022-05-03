import React from 'react';
import { Link } from "react-router-dom";
import './Snack.css';

const Candy = ({ image }) => {

  return (
    <div className="Snack"
         style={{ backgroundImage: `url(${image})`}} >
      <Link exact to="/">Go Back</Link>
    </div>
  );
};

export default Candy;