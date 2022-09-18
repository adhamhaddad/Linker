import React from 'react';
import classes from './TopNavbar.module.css';

function TopNavbar(props) {
  return <div className={classes['top-container']}>{props.children}</div>;
}
export default TopNavbar;
