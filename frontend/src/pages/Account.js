import React, { useReducer, useContext, useEffect, useState } from 'react';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import Button from '../components/UI/Button';
import BackButton from '../components/UI/BackButton';
import Modal from '../components/Modal';
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
const Account = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [accountData, setAccountData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    gender: '',
    changed: ''
  });
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);

  const [accountForm, dispatch] = useReducer(accountFormReducer, {
    first_name: '',
    last_name: '',
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
  };

  const onDeleteAccount = () => {
    sendRequest(
      'users',
      'DELETE',
      {
        user_id: authCtx.user.user_id
      },
      () => {
        authCtx.onLogout();
      }
    );
  };

  const deletePortalToggle = () => {
    setDeleteAccount((prev) => !prev);
  };

  const changeUsernameHandler = (e) => {
    setAccountData((prev) => ({ ...prev, username: e.target.value }));
  };
  const changeFirstNameHandler = (e) => {
    setAccountData((prev) => ({ ...prev, first_name: e.target.value }));
  };
  const changeLastNameHandler = (e) => {
    setAccountData((prev) => ({ ...prev, last_name: e.target.value }));
  };
  useEffect(() => {
    sendRequest(
      `user-account?username=${authCtx.user.username}`,
      'GET',
      {},
      setAccountData
    );
  }, []);
  return (
    <section className={classes['sections']}>
      <h3 className={classes['title']}>
        <BackButton path='/settings' />
        Account
      </h3>
      <form onSubmit={onFormSubmitHandler} className={classes.form}>
        <div className={classes['nameInputs']}>
          <div className={classes['name']}>
            <label htmlFor='fname'>First Name</label>
            <input
              type='text'
              id='fname'
              value={accountData.first_name}
              onChange={changeFirstNameHandler}
            />
          </div>
          <div className={classes['name']}>
            <label htmlFor='fname'>Last Name</label>
            <input
              type='text'
              id='lname'
              value={accountData.last_name}
              onChange={changeLastNameHandler}
            />
          </div>
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={accountForm.username}
            placeholder={accountData.username}
            onChange={changeUsernameHandler}
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
            type='text'
            value={`Last changed on ${new Date(
              accountData.changed
            ).toLocaleString('en-US', {
              dateStyle: 'full'
            })}`}
            onChange={onChangeHandler}
            disabled
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
      {!isLoading && (
        <Button
          type='button'
          onClick={deletePortalToggle}
          className='delete-account'
        >
          delete account
        </Button>
      )}
      {deleteAccount && (
        <Modal>
          <div className={classes['delete-account']}>
            <div className={classes['question']}>
              <p>Are you sure thet you want to delete your account?</p>
              <button
                className='fa-solid fa-xmark'
                onClick={deletePortalToggle}
              ></button>
            </div>
            <div className={classes['actions']}>
              <Button
                type='button'
                onClick={onDeleteAccount}
                className='delete-account'
              >
                delete
              </Button>
              <Button
                type='button'
                onClick={deletePortalToggle}
                className='cancel-deletion'
              >
                cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
export default Account;
