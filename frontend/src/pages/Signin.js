import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import Button from '../components/UI/Button';
import Container from '../components/UI/Container';
import FormHeader from '../components/FormHeader';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import classes from '../css/Form.module.css';

const isEmail = (value) => value.trim().includes('@');

const formValidation = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      username: action.input === 'text' ? action.val : state.username,
      password: action.input === 'password' ? action.val : state.password,
      checked: action.input === 'check' ? action.val : state.checked,
      isValid:
        state.username.trim().length > 4 && state.password.trim().length >= 8
    };
  }
  if (action.type === 'BLUR') {
    return {
      username: state.username.trim() > 4,
      password: state.password.trim().length >= 8,
      checked: state.checked,
      isValid:
        state.username.trim().length > 4 && state.password.trim().length >= 8
    };
  }
  return {
    username: '',
    password: '',
    checked: false,
    isValid: false
  };
};

const Signin = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const authContext = useContext(AuthenticateContext);
  const history = useHistory();
  const [formValues, dispatch] = useReducer(formValidation, {
    username: '',
    password: '',
    checked: false,
    isValid: false
  });
  const formValidateHandler = (e) => {
    dispatch({ type: 'INPUT', val: e.target.value, input: e.target.type });
  };

  const authenticationHandler = (data) => {
    authContext.onLogin(data.token, data.user);
    history.replace(`/profile/${data.user.username}`);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const emailCheck = isEmail(formValues.username);
    if (emailCheck) {
      sendRequest(
        'authenticate',
        'POST',
        {
          email: formValues.username,
          current_password: formValues.password
        },
        authenticationHandler
      );
    } else {
      sendRequest(
        'authenticate',
        'POST',
        {
          username: formValues.username,
          current_password: formValues.password
        },
        authenticationHandler
      );
    }
  };

  return (
    <Container className='form'>
      <FormHeader />
      <form
        className={classes.form}
        autoComplete='off'
        onSubmit={submitFormHandler}
      >
        <input
          type='text'
          placeholder='Username or Email Address'
          id='user'
          title='User Name'
          name='username'
          value={formValues.username}
          onChange={formValidateHandler}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='pass'
          title='Password'
          name='password'
          minLength='8'
          value={formValues.password}
          onChange={formValidateHandler}
          required
        />
        <label className={classes.checkbox}>
          <input
            type='checkbox'
            id='check'
            name='check'
            value={formValues.checked}
            onChange={formValidateHandler}
          />
          <span>remember me</span>
        </label>
        {!isLoading && (
          <Button className='btn-form' disabled={false}>
            log in
          </Button>
        )}
        {isLoading && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
      </form>
    </Container>
  );
};
export default Signin;
