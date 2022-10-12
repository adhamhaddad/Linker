import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../css/BackButton.module.css';

const BackButton = ({ path }) => {
  return (
    <Link className={classes['back-button']} to={path}>
      Back
    </Link>
  );
};
export default BackButton;
