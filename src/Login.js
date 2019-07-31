import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
  return (
    <div className='Login-form'>
      <input type="text" placeholder="username"  name="username"/>
      <input type="password" placeholder = "password" name="password"/>
      <div>
        <Link to={'./story-list' }>
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;