import React, { useRef, useContext } from 'react';
import Authenticate from '../../Authentication/auth';
import './Styles.css';

function Signup(props) {
  const ctx = useContext(Authenticate);
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');
  const gender = useRef('');
  const check = useRef('');

  const loginChangeHandler = (e) => {
    e.preventDefault();
    props.switchForm(false);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    ctx.onSignup({
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender.current.value
    });
    // username.current.value = '';
    // email.current.value = '';
    // password.current.value = '';
    // gender.current.value = '';
    // check.current.value = '';
  };

  return (
    <div className='container form'>
      <div className='switch-box'>
        <a href='/login' onClick={loginChangeHandler}>
          log in
        </a>
        <a
          href='/register'
          rel='noreferrer'
          className={props.register ? 'active' : null}
        >
          register
        </a>
      </div>
      <ul className='links'>
        <li>
          <a href='https://www.facebook.com' rel='noreferrer'>
            <i className='fa-brands fa-facebook fa-1x'></i>
          </a>
        </li>
        <li>
          <a href='https://www.twitter.com' rel='noreferrer'>
            <i className='fa-brands fa-twitter fa-1x'></i>
          </a>
        </li>
        <li>
          <a href='https://www.google.com' rel='noreferrer'>
            <i className='fa-brands fa-google fa-1x'></i>
          </a>
        </li>
      </ul>
      <form method='POST' autoComplete='on' onSubmit={signupHandler}>
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          ref={username}
          // value={formData.username}
          // onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          id='email'
          title='Email Address'
          name='email'
          ref={email}
          // value={formData.email}
          // onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='New Password'
          minLength='8'
          id='pass'
          title='New Password'
          name='password'
          ref={password}
          // value={formData.password}
          // onChange={handleChange}
          required
        />
        <div className='radio'>
          <label>
            <input
              type='radio'
              id='male'
              name='gender'
              title='Male'
              value='male'
              ref={gender}
              // onChange={handleChange}
              required
            />
            <span>male</span>
          </label>
          <label>
            <input
              type='radio'
              id='female'
              name='gender'
              title='Female'
              value='female'
              ref={gender}
              // onChange={handleChange}
              required
            />
            <span>female</span>
          </label>
        </div>
        <label className='checkbox'>
          <input
            type='checkbox'
            name='check'
            ref={check}
            // checked={formData.check}
            // onChange={handleChange}
            required
          />
          <span>I agree to the terms & conditions</span>
        </label>
        <button>sign up</button>
      </form>
    </div>
  );
}
export default Signup;
