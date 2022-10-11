import React from 'react';
import classes from './Container.module.css';

function Container(props) {
  return (
    <div className={`${classes.container} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
}
export default Container;
