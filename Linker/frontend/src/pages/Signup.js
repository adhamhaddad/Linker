import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import FormHeader from '../components/FormHeader/FormHeader';
import Container from '../components/UI/Container';
import Button from '../components/UI/Button/Button';
import classes from '../css/Form.module.css';

const formReducer = (state, action) => {
  if (action.type === 'TEXT') {
    return {
      username: action.val,
      email: state.email,
      password: state.password,
      gender: state.gender,
      checked: state.checked
    };
  }
  if (action.type === 'EMAIL') {
    return {
      username: state.username,
      email: action.val,
      password: state.password,
      gender: state.gender,
      checked: state.checked
    };
  }
  if (action.type === 'PASSWORD') {
    return {
      username: state.username,
      email: state.email,
      password: action.val,
      gender: state.gender,
      checked: state.checked
    };
  }
  if (action.type === 'RADIO') {
    return {
      username: state.username,
      email: state.email,
      password: state.password,
      gender: action.val,
      checked: state.checked
    };
  }
  if (action.type === 'CHECKBOX') {
    return {
      username: state.username,
      email: state.email,
      password: state.password,
      gender: state.gender,
      checked: action.val
    };
  }
  return {
    username: '',
    email: '',
    password: '',
    gender: '',
    checked: false
  };
};

const Signup = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const history = useHistory();
  const [formState, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    gender: '',
    checked: false
  });

  const formChangeHandler = (e) => {
    dispatch({ type: e.target.type.toUpperCase(), val: e.target.value });
  };
  const createNewUser = () => {
    sendRequest('user', 'POST', {
      username: formState.username,
      email: formState.email,
      password: formState.password,
      gender: formState.gender,
      checked: formState.checked
    });
    isError === null && history.replace('/signin');
  };
  const signupHandler = (e) => {
    e.preventDefault();
    createNewUser();
  };

  return (
    <Container className='form'>
      <FormHeader />

      <form className={classes.form} autoComplete='off' onSubmit={signupHandler}>
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          value={formState.username}
          onChange={formChangeHandler}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          id='email'
          title='Email Address'
          name='email'
          value={formState.email}
          onChange={formChangeHandler}
          required
        />
        <input
          type='password'
          placeholder='New Password'
          minLength='8'
          id='pass'
          title='New Password'
          name='password'
          value={formState.password}
          onChange={formChangeHandler}
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
              onChange={formChangeHandler}
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
              onChange={formChangeHandler}
              required
            />
            <span>female</span>
          </label>
        </div>
        <label className={classes.checkbox}>
          <input
            type='checkbox'
            name='check'
            value={formState.checked}
            onChange={formChangeHandler}
            required
          />
          <span>I agree to the terms & conditions</span>
        </label>
        {!isLoading && <Button className='btn-form'>sign up</Button>}
        {isLoading && <p className={classes.loading}>Creating account ..</p>}
        {isError !== null && <p className={classes.error}>{isError}</p>}
      </form>
    </Container>
  );
};
export default Signup;
