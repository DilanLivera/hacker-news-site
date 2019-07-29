import React from 'react';
import LoginButton from './components/LoginButton'
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className='title'>Hacker News</h1>
      <LoginButton to="./login"/>
    </header>
  );
}

export default Header;