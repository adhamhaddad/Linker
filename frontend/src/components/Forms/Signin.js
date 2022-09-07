import React, { useState, useRef, useEffect } from 'react';
import './Styles.css';

function Signin(props) {
  const [enableLogin, setEnableLogin] = useState(false);
  const [validateForm, setValidateForm] = useState({
    username: '',
    password: '',
    remember: false
  });

  const validation = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        username: e.target.type === 'text' && e.target.value,
        password: e.target.type === 'password' && e.target.value
      };
    });
    console.log(validateForm.username.split('').includes('@'));
  };

  return (
    <div className='container'>
      <div className='switch-box'>
        <a href='/login' className={props.login ? 'active' : null}>
          <span>log in</span>
        </a>
        <a href='/register'>
          <span>register</span>
        </a>
      </div>
      <ul className='links'>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-facebook'></i>
          </a>
        </li>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-twitter'></i>
          </a>
        </li>
        <li>
          <a href='#' rel='noreferrer'>
            <i className='fa-brands fa-google'></i>
          </a>
        </li>
      </ul>
      <form action='/authenticate' method='POST' autoComplete='on'>
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          required
          onChange={validation}
          onBlur={validation}
        />
        <input
          type='password'
          placeholder='Password'
          minLength='8'
          id='pass'
          title='Password'
          name='password'
          required
          onChange={validation}
          onBlur={validation}
        />
        <label className='checkbox'>
          <input type='checkbox' id='check' name='check' />
          <span>remember me</span>
        </label>
        <button type='submit' disabled={enableLogin}>
          log in
        </button>
      </form>
    </div>
  );
}
export default Signin;
