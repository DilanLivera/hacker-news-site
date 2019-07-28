import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className='title'>Hacker News</h1>
      <button className='login-btn'>Login</button>
    </header>
  );
}

export default Header;