import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.css'
function LoginButton({ to }) {
  return (
    <Link to={ to }>
      <button className='login-btn'>Login</button>
    </Link>
  );
}

export default LoginButton;