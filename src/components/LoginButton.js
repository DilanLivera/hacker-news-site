import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.css'
function LoginButton({ to }) {
  return (
    <div className='LoginButton-container'>
      <Link to={ to }>
        <button className='LoginButton-btn'>Login</button>
      </Link>
    </div>
  );
}

export default LoginButton;