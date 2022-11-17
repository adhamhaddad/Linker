import React from 'react';
import classes from '../css/Error.module.css';

const Error = ({ message, color }) => {
  return <div className={`${classes.error} ${classes[color]}`}>{message}</div>;
};
export default Error;
