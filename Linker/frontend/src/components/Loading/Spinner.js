import React from 'react';
import classes from '../../css/Loading.module.css';

const SpinnerLoading = ({ color }) => {
  return (
    <div className={classes.spinner}>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
    </div>
  );
};
export default SpinnerLoading;
