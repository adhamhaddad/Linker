import React from 'react';
import classes from '../css/Logo.module.css';

function Logo() {
  return (
    <div className={classes['app-logo']}>
      <span className={classes.logo}></span>
    </div>
  );
}
export default Logo;
