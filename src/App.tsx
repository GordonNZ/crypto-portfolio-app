import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';
import Portfolio from './pages/portfolio/Portfolio';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/signIn/SignIn';
import { auth } from './config/firebase';

function App() {
  const storedCurrency = localStorage.getItem('currency');
  const [currency, setCurrency] = useState<any>(storedCurrency);
  const [user, setUser] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const handleSetCurrency = (currency: string) => {
    setCurrency(currency);
  };
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  //Get current user
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(auth?.currentUser?.email!);
      setUserId(auth?.currentUser?.uid!);
      console.log(userId);
    } else {
      setUser('');
      setUserId('');
    }
  });

  return (
    <div className='App'>
      <Navbar
        currency={currency}
        handleSetCurrency={handleSetCurrency}
        user={user}
      />
      <Routes>
        <Route path='/' element={<Home currency={currency} />} />
        <Route path='/coin/:id' element={<CoinDetail currency={currency} />} />
        <Route
          path='/portfolio'
          element={<Portfolio currency={currency} userId={userId} />}
        />
        <Route
          path='/signin'
          element={<SignIn user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
