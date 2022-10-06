import React from 'react';
import { Link } from 'react-router-dom';
import classes from './FormHeader.module.css';

const FormHeader = () => {
  return (
    <div className={classes['switch-box']}>
      <Link to='/signin' className={classes.active}>
        <span>log in</span>
      </Link>
      <Link to='/signup'>
        <span>register</span>
      </Link>
    </div>
  );
};
export default FormHeader;
