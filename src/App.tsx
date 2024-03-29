import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CoinDetail from './pages/coinDetail/CoinDetail';
import Portfolio from './pages/portfolio/Portfolio';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/signIn/SignIn';
import { auth } from './config/firebase';
import Footer from './components/Footer/Footer';

// Define a type for the context value
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getWindowWidth = () => {
  return window.innerWidth;
};

function App() {
  const storedCurrency = localStorage.getItem('currency');
  const [currency, setCurrency] = useState<any>(storedCurrency);
  const [user, setUser] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [theme, setTheme] = useState<string>('Dark');
  const [checked, setChecked] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState(getWindowWidth);

  //getting currency from local storage and setting currency
  const handleSetCurrency = (currency: string) => {
    setCurrency(currency);
  };
  useEffect(() => {
    if (!storedCurrency) {
      setCurrency('NZD');
    }
    localStorage.setItem('currency', currency);
  }, [currency]);

  //Get current user on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(auth?.currentUser?.email!);
        setUserId(auth?.currentUser?.uid!);
      } else {
        setUser('');
        setUserId('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run once on mount

  //toggle light and dark theme
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'Dark' ? 'Light' : 'Dark'));
  };
  //calling toggle theme on switch checked/unchecked
  const onCheckedChange = (checked: boolean) => {
    setChecked(checked);
    toggleTheme();
  };

  //update window width
  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(getWindowWidth());
    };

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // console.log(screenWidth);
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
          <Route
            path='/'
            element={<Home currency={currency} screenWidth={screenWidth} />}
          />
          <Route
            path='/coin/:id'
            element={<CoinDetail currency={currency} />}
          />
          <Route
            path='/portfolio'
            element={
              <Portfolio
                currency={currency}
                userId={userId}
                screenWidth={screenWidth}
              />
            }
          />
          <Route
            path='/signin'
            element={<SignIn user={user} setUser={setUser} />}
          />
        </Routes>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
