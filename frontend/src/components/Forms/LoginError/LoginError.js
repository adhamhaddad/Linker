import React, { useState } from 'react';
import classes from './LoginError.module.css';

const LoginError = (props) => {
  const [status, setStatus] = useState(false);

  props.status &&
    setTimeout(() => {
      setStatus(true);
    }, 1000);
  return (
    <div className={status ? classes.hide : classes.error}>
      <p>Username or password doesn't match</p>
    </div>
  );
};
export default LoginError;
