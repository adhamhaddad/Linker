import React, { useReducer, useContext, useEffect, useState } from 'react';
import WindowContext from '../store/windowSize';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import Button from '../components/UI/Button/Button';
import BackButton from '../components/UI/BackButton';
import classes from '../css/Account.module.css';

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
const Account = ({ user_id }) => {
  const [accountData, setAccountData] = useState({});
  const { isLoading, isError, sendRequest } = useHttp();
  const windowCtx = useContext(WindowContext);
  const authCtx = useContext(AuthenticateContext);
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

  const deleteAccountHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    sendRequest(
      `user?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setAccountData
    );
  }, []);
  return (
    <section className={classes.sections}>
      {windowCtx.windowSize <= 600 && <BackButton path='/settings' />}
      <form onSubmit={onFormSubmitHandler} className={classes.form}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={accountForm.username}
            placeholder={accountData.username}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={accountForm.email}
            placeholder={accountData.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='gender'>Gender</label>
          <select
            name='gender'
            id='gender'
            onChange={onChangeHandler}
            value={accountData.gender}
          >
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
        <div>
          <label htmlFor='joined'>Joined</label>
          <input
            type='text'
            value={new Date(accountData.joined).toLocaleString('en-US', {
              dateStyle: 'full'
            })}
            disabled
          />
        </div>
      </form>

      <Button type='button' onClick={authCtx.onLogout} className='btn-logout'>
        logout
      </Button>
      <Button
        type='button'
        onClick={deleteAccountHandler}
        className='delete-account'
      >
        delete account
      </Button>
    </section>
  );
};
export default Account;
