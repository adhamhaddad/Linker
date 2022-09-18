import React, { useContext } from 'react';
import { useEffect } from 'react';
import Authenticate from '../../../Authentication/auth';
import classes from './LoginError.module.css';

const LoginError = () => {
  const ctx = useContext(Authenticate);

  useEffect(() => {
    console.log('Error');
    const err = setTimeout(() => {
      ctx.onAuthError.setAuthError(false);
    }, 3500);

    return () => {
      console.log('Cleanup');
      clearTimeout(err);
    };
  }, [ctx.onAuthError.authError]);

  return (
    <div className={ctx.onAuthError.authError ? classes.error : classes.hide}>
      <p>
        Sorry, username or password authentication didn't work. Please try
        again.
      </p>
    </div>
  );
};
export default LoginError;
