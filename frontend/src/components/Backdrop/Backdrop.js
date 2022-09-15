import React from 'react';
import classes from './Backdrop.module.css';

function Backdrop(props) {
  return <div className={classes.overlay} onClick={props.onClicked}></div>;
}
export default Backdrop;
