import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../Authentication/auth';
import Button from '../UI/Button/Button';
import Container from '../UI/Container/Container';
import FormHeader from './FormHeader/FormHeader';
import classes from '../../css/Form.module.css';

const Signin = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const authContext = useContext(AuthenticateContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [enableLogin, setEnableLogin] = useState(true);
  const history = useHistory();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    validations();
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    validations();
  };
  const checkboxHandler = (e) => {
    setCheck(e.target.value);
  };

  const validations = () => {
    if (username.trim().length > 5 && password.trim().length >= 8) {
      setEnableLogin(false);
    } else {
      setEnableLogin(true);
    }
  };
  useEffect(() => {
    validations();
  }, [usernameHandler, passwordHandler]);

  const authenticationHandler = (data) => {
    authContext.onLogin(data.token);
    history.replace('/profile');
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    sendRequest(
      'authenticate',
      'POST',
      {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      },
      authenticationHandler
    );
    setUsername('');
    setPassword('');
    setCheck('');
  };

  return (
    <Container className='form'>
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
        autoComplete='on'
        onSubmit={submitFormHandler}
      >
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          ref={usernameRef}
          value={username}
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
          ref={passwordRef}
          value={password}
          onChange={passwordHandler}
          required
        />
        <label className={classes.checkbox}>
          <input
            type='checkbox'
            id='check'
            name='check'
            value={check}
            onChange={checkboxHandler}
          />
          <span>remember me</span>
        </label>
        {!isLoading && (
          <Button className='btn-form' disabled={enableLogin}>
            log in
          </Button>
        )}
        {isLoading && <p className={classes.loading}>Login ...</p>}
        {isError !== null && <p className={classes.error}>{isError}</p>}
      </form>
    </Container>
  );
};
export default Signin;
