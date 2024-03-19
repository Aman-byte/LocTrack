import React from 'react';
import { Link } from 'react-router-dom';
import logo from './loctracklogo.png';

const logoStyle = {
  display: 'inline',
  marginRight: '10px',
};

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
        <li style={logoStyle}>
          <img src={logo} alt="Logo" style={{ height: '50px', width: 'auto' }} />
        </li>

        <li style={{ display: 'inline' }}><Link to="/" style={linkStyle}>Home</Link></li>
        <li style={{ display: 'inline' }}><Link to="/login" style={linkStyle}>Login</Link></li>
        <li style={{ display: 'inline' }}><Link to="/display" style={linkStyle}>Profile</Link></li>
      </ul>
    </nav>
  );
};

const navStyle = {
  background: 'lightgreen',
  padding: '10px',
  color: '#fff',
};

const linkStyle = {
  margin: '0 10px',
  color: 'black',
  textDecoration: 'none',
};

export default Navbar;