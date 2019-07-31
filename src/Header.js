import React from 'react';
import LoginButton from './components/LoginButton'
import './Header.css';

function Header() {
  return (
    <header className="Header-app-header">
      <h1 className='Header-title'>Hacker News</h1>
      <LoginButton to="./login"/>
    </header>
  );
}

export default Header;