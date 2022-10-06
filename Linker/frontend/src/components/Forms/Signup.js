import React, { useRef, useContext } from 'react';
import Authenticate from '../../Authentication/auth';
import FormHeader from './FormHeader/FormHeader';
import classes from './Form.module.css';
import Container from '../UI/Container/Container';

function Signup() {
  const ctx = useContext(Authenticate);
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');
  const gender = useRef('');
  const check = useRef('');

  const signupHandler = (e) => {
    e.preventDefault();
    ctx.onSignup({
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender.current.value
    });
  };

  
  return (
    <Container className={`${classes.container} form`}>
      <FormHeader />
      <ul className={classes.links}>
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
      <form className={classes.form} method='POST' autoComplete='on' onSubmit={signupHandler}>
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          ref={username}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          id='email'
          title='Email Address'
          name='email'
          ref={email}
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
          required
        />
        <div className={classes.radio}>
          <label>
            <input
              type='radio'
              id='male'
              name='gender'
              title='Male'
              value='male'
              ref={gender}
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
              required
            />
            <span>female</span>
          </label>
        </div>
        <label className={classes.checkbox}>
          <input type='checkbox' name='check' ref={check} required />
          <span>I agree to the terms & conditions</span>
        </label>
        <button>sign up</button>
      </form>
    </Container>
  );
}
export default Signup;
