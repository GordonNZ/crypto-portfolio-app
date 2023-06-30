import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <div className='nav'>
        <Link to='/' className='navbarTitle'>
          <h1>CryptoTrackr</h1>
        </Link>
        <div className='navbarLinks'>
          {/* <Link to='/'>Home</Link> */}
          <Link to='/portfolio' className='portfolio'>
            Portfolio
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
