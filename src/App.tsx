import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:id' element={<CoinDetail />} />
      </Routes>
    </div>
  );
}

export default App;
