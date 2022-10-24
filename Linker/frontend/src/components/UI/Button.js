import React from 'react';
import classes from '../../css/Button.module.css';

function Button(props) {
  return (
    <button
      className={`${classes.button} ${classes[props.className]}`}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
export default Button;
