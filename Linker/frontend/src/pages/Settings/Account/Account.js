import React, { useReducer } from 'react';
import Container from '../../../components/UI/Container/Container';
import classes from './Account.module.css';

const accountFormReducer = (state, action) => {
  if (action.type === 'TEXT') {
    return {
      username: action.val,
      email: state.email,
      gender: state.gender,
      password: state.password
    };
  }
  if (action.type === 'EMAIL') {
    return {
      username: state.username,
      email: action.val,
      gender: state.gender,
      password: state.password
    };
  }
  if (action.type === 'SELECT-ONE') {
    return {
      username: state.username,
      email: state.email,
      gender: action.val,
      password: state.password
    };
  }
  if (action.type === 'PASSWORD') {
    return {
      username: state.username,
      email: state.email,
      gender: state.gender,
      password: action.val
    };
  }

  return {
    username: '',
    email: '',
    password: '',
    gender: ''
  };
};
const Account = () => {
  const [accountForm, dispatch] = useReducer(accountFormReducer, {
    username: '',
    email: '',
    password: '',
    gender: ''
  });

  const onChangeHandler = (e) => {
    dispatch({ type: e.target.type.toUpperCase(), val: e.target.value });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(accountForm);
  };
  return (
    <Container>
      <form onSubmit={onFormSubmitHandler} className={classes.form}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={accountForm.username}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={accountForm.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='gender'>Gender</label>
          <select name='gender' id='gender' onChange={onChangeHandler}>
            <option value='male'>male</option>
            <option value='female'>female</option>
          </select>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={accountForm.password}
            onChange={onChangeHandler}
          />
        </div>
        <button className={classes.confirm}>confirm</button>
      </form>
    </Container>
  );
};
export default Account;
