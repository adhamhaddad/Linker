import React from 'react';
import classes from '../../css/Container.module.css';

const Container = (props) => {
  return (
    <div className={`${classes.container} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
};
export default Container;
