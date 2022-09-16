import React from 'react';
import Informations from './Information/Information';
import './Settings.css';

function Settings(props) {
  const settingsClickHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className='container settings'>
      <aside>
        <ul>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-circle-info'></i>
              <span>information</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-shield-halved'></i>
              <span>privacy</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-envelope'></i>
              <span>emails</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-bell'></i>
              <span>notifications</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-language'></i>
              <span>language</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-circle-user'></i>
              <span>account</span>
            </a>
          </li>
        </ul>
        <button onClick={props.logoutHandler} className='logout-btn'>logout</button>
      </aside>
      <section className='information-section'>
        <Informations />
      </section>
    </div>
  );
}
export default Settings;
