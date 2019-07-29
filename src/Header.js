import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className='title'>Hacker News</h1>
      <Link to={ './login' }>
        <button className='login-btn'>Login</button>
      </Link>
    </header>
  );
}

export default Header;