import './Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Currency } from '../currency/Currency';
import SwitchComp from '../switch/SwitchComp';

type Props = {
  currency: string;
  handleSetCurrency: (currency: string) => void;
  user: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  theme: string;
};

const Navbar: React.FC<Props> = ({
  currency,
  handleSetCurrency,
  user,
  checked,
  onCheckedChange,
  theme,
}: Props) => {
  return (
    <nav>
      <div className='nav'>
        <Link to='/' className='navbarTitle'>
          <h1>Another Crypto Website</h1>
        </Link>
        <div className='navbarLinks'>
          {/* <Link to='/'>Home</Link> */}
          <Link to='/portfolio' className='portfolio'>
            Portfolio
          </Link>
          <div>
            {user ? (
              <Link to='/signin' className='signin'>
                {user}
              </Link>
            ) : (
              <Link to='/signin' className='signin'>
                Sign In
              </Link>
            )}
          </div>
          <Currency currency={currency} handleSetCurrency={handleSetCurrency} />
          <SwitchComp
            onCheckedChange={onCheckedChange}
            checked={checked}
            theme={theme}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
