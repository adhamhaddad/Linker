import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button className={`button ${props.className}`} disabled={props.disabled} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
}
export default Button;
