import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';
import Portfolio from './pages/portfolio/Portfolio';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/signIn/SignIn';
import { auth } from './config/firebase';

// Define a type for the context value
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function App() {
  const storedCurrency = localStorage.getItem('currency');
  const [currency, setCurrency] = useState<any>(storedCurrency);
  const [user, setUser] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [theme, setTheme] = useState<string>('Dark');
  const [checked, setChecked] = useState<boolean>(true);

  //getting currency from local storage and setting currency
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
  //toggle light and dark theme
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'Dark' ? 'Light' : 'Dark'));
  };
  //calling toggle theme on switch checked/unchecked
  const onCheckedChange = (checked: boolean) => {
    setChecked(checked);
    toggleTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        <Navbar
          currency={currency}
          handleSetCurrency={handleSetCurrency}
          user={user}
          checked={checked}
          onCheckedChange={onCheckedChange}
          theme={theme}
        />
        <Routes>
          <Route path='/' element={<Home currency={currency} />} />
          <Route
            path='/coin/:id'
            element={<CoinDetail currency={currency} />}
          />
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
    </ThemeContext.Provider>
  );
}

export default App;
