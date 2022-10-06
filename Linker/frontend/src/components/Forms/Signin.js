import React, { useState, useContext } from 'react';
import LoginError from './LoginError/LoginError';
import Authenticate from '../../Authentication/auth';
import Button from '../UI/Button/Button';
import Container from '../UI/Container/Container';
import FormHeader from './FormHeader/FormHeader';
import classes from './Form.module.css';

function Signin() {
  const ctx = useContext(Authenticate);
  const [enableLogin, setEnableLogin] = useState(false);
  const [validateForm, setValidateForm] = useState({
    username: '',
    password: '',
    remember: false
  });

  const usernameHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        username: e.target.value
      };
    });
  };
  const passwordHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        password: e.target.value
      };
    });
  };

  const checkboxHandler = (e) => {
    setValidateForm((prev) => {
      return {
        ...prev,
        remember: e.target.value
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctx.onLogin(validateForm.username, validateForm.password);
    setValidateForm({
      username: '',
      password: '',
      remember: ''
    });
  };

  return (
    <Container className={`${classes.container} form`}>
      <FormHeader />
      <ul className={classes.links}>
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
      <form
        className={classes.form}
        method='POST'
        autoComplete='on'
        onSubmit={submitHandler}
      >
        {ctx.onAuthError.authError && <LoginError />}

        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          value={validateForm.username}
          onChange={usernameHandler}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='pass'
          title='Password'
          name='password'
          minLength='8'
          value={validateForm.password}
          onChange={passwordHandler}
          required
        />
        <label className={classes.checkbox}>
          <input
            type='checkbox'
            id='check'
            name='check'
            value={validateForm.remember}
            onChange={checkboxHandler}
          />
          <span>remember me</span>
        </label>
        <Button
          className={classes['btn-login']}
          type='submit'
          disabled={enableLogin}
        >
          log in
        </Button>
      </form>
    </Container>
  );
}
export default Signin;
