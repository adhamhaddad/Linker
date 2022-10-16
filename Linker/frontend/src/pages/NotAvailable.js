import React from 'react';
import classes from '../css/NotAvailable.module.css';

const UnderDevelopment = () => {
  return (
    <div className={classes['content']}>
      <h1>This page is under development.</h1>
      <div className={classes['image-content']}></div>
    </div>
  );
};
export default UnderDevelopment