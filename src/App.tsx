import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';
import Portfolio from './pages/portfolio/Portfolio';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/signIn/SignIn';

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
      <Navbar currency={currency} handleSetCurrency={handleSetCurrency} />
      <Routes>
        <Route path='/' element={<Home currency={currency} />} />
        <Route path='/coin/:id' element={<CoinDetail currency={currency} />} />
        <Route path='/portfolio' element={<Portfolio currency={currency} />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
