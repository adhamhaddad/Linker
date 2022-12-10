import React from 'react';
import classes from '../../css/Loading.module.css';

const SpinnerLoading = ({ color, theme }) => {
  return (
    <div className={classes.spinner}>
      <div className={classes[color]} style={{borderColor: `${theme} transparent transparent transparent`}}></div>
      <div className={classes[color]} style={{borderColor: `${theme} transparent transparent transparent`}}></div>
      <div className={classes[color]} style={{borderColor: `${theme} transparent transparent transparent`}}></div>
      <div className={classes[color]} style={{borderColor: `${theme} transparent transparent transparent`}}></div>
    </div>
  );
};
export default SpinnerLoading;
