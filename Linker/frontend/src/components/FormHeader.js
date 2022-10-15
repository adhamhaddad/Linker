import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../css/FormHeader.module.css';

const FormHeader = () => {
  return (
    <div className={classes['switch-box']}>
      <NavLink to='/signin' activeClassName={classes.active}>
        log in
      </NavLink>
      <NavLink to='/signup' activeClassName={classes.active}>
        register
      </NavLink>
    </div>
  );
};
export default FormHeader;
