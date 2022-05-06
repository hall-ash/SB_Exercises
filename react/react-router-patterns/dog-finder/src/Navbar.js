import React from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = ({ names }) => {

  const links = names.map(name => <NavLink key={name} to={`/dogs/${name.toLowerCase()}`}>{name}</NavLink>);

  return (
    <nav>
      <NavLink to={`/dogs/`}>Home</NavLink>
      {links}
    </nav>
  );
};

export default Navbar;