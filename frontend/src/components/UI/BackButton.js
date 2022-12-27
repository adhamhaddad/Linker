import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../css/BackButton.module.css';

const BackButton = ({ path }) => {
  return (
    <Link
      className={`fa-solid fa-caret-left ${classes['back-button']}`}
      to={path}
    ></Link>
  );
};
export default BackButton;
