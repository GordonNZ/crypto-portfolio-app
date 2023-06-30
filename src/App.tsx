import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';

function App() {
  const storedCurrency = localStorage.getItem('currency');
  const [currency, setCurrency] = useState<any>(storedCurrency);

  const handleSetCurrency = (currency: string) => {
    setCurrency(currency);
  };
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Home currency={currency} handleSetCurrency={handleSetCurrency} />
          }
        />
        <Route path='/coin/:id' element={<CoinDetail currency={currency} />} />
      </Routes>
    </div>
  );
}

export default App;
