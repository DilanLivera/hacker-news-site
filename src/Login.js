import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
  return (
    <div className='login-form'>
      <input type="text" placeholder="username"  name="username"/>
      <input type="password" placeholder = "password" name="password"/>
      <Link to={'./story-list' }>
        <button>Log in</button>
      </Link>
    </div>
  );
}

export default Login;