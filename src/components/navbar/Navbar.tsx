import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <Link to='/' className='navbarTitle'>
        <h1>CryptoTrackr</h1>
      </Link>
      <div className='navbarLinks'>
        <Link to='/'>Home</Link>
        <Link to='/portfolio'>Portfolio</Link>
      </div>
    </nav>
  );
};

export default Navbar;
