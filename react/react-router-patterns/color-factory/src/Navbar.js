import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav>
      <p>Welcome to the color factory.</p>
      <NavLink to="/colors/new">Add a color</NavLink>
    </nav>
  )
};

export default Navbar;