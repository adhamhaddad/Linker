import React from 'react';
import './Container.css';

function Container(props) {
  return <div className={`container ${props.className}`}>{props.children}</div>;
}
export default Container;
