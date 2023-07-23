import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  currency: string;
  handleSetCurrency: (currency: string) => void;
};

const Navbar: React.FC<Props> = ({ currency, handleSetCurrency }: Props) => {
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
          <Link to='/signin' className='signin'>
            Sign In
          </Link>
          <div className='flex currencySelect'>
            <p>Currency: </p>
            <select
              name='currency'
              className='currencyOptions'
              defaultValue={currency}
            >
              <option
                value='NZD'
                onClick={() => {
                  handleSetCurrency('NZD');
                }}
              >
                NZD
              </option>
              <option
                value='USD'
                onClick={() => {
                  handleSetCurrency('USD');
                }}
              >
                USD
              </option>
              <option
                value='AUD'
                onClick={() => {
                  handleSetCurrency('AUD');
                }}
              >
                AUD
              </option>
              <option
                value='EUR'
                onClick={() => {
                  handleSetCurrency('EUR');
                }}
              >
                EUR
              </option>
              <option
                value='HKD'
                onClick={() => {
                  handleSetCurrency('HKD');
                }}
              >
                HKD
              </option>
              <option
                value='GBP'
                onClick={() => {
                  handleSetCurrency('GBP');
                }}
              >
                GBP
              </option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
