import React, { useState } from 'react';
import './App.css';
import Bookstore from './Bookstore/Bookstore';
import Header from './Comnponent/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Bookstore darkMode={darkMode} />
    </div>
  );
}

export default App;
