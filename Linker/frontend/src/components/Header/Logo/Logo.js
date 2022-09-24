import React from 'react';
import classes from './Logo.module.css';

function Logo() {
  return (
    <div className={classes['app-logo']}>
      <span className={classes.logo}>
        <i className='fa-solid fa-link'></i>
      </span>
    </div>
  );
}
export default Logo;
