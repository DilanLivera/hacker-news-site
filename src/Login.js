import React from 'react';
import './Login.css'

function Login() {
  return (
    <div className='login-form'>
      <input type="text" placeholder="username"  name="username"/>
      <input type="password" placeholder = "password" name="password"/>
      <button>Log in</button>
    </div>
  );
}

export default Login;