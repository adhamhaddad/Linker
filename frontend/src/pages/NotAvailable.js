import React from 'react';
import classes from '../css/NotAvailable.module.css';

const UnderDevelopment = ({ color }) => {
  return (
    <div className={classes['content']}>
      <h1 className={classes[color]}>This page is under development.</h1>
      <div className={`${classes['content-animation']} ${classes[color]} `}>
        <i className={`fa-solid fa-cog ${classes['icon1']}`}></i>
        <i className={`fa-solid fa-cog ${classes['icon2']}`}></i>
      </div>
      <div className={classes['image-content']}></div>
    </div>
  );
};
export default UnderDevelopment;
