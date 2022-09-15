import React from 'react';
import './Overlay.css';

function Overlay(props) {
  return <div className='overlay'>{props.children}</div>;
}
export default Overlay;
