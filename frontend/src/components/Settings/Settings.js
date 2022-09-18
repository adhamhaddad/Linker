import React, { useContext } from 'react';
import Informations from './Information/Information';
import Authenticate from '../../Authentication/auth';
import Button from '../UI/Button/Button';
import Container from '../UI/Container/Container';
import './Settings.css';

function Settings() {
  const ctx = useContext(Authenticate);
  const settingsClickHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container className='settings'>
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
              <span>privacy & security</span>
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
          <li>
            <a href='#' onClick={settingsClickHandler}>
              <i className='fa-solid fa-circle-question'></i>
              <span>help</span>
            </a>
          </li>
        </ul>
        <Button onClick={ctx.onLogout} className='logout-btn'>
          logout
        </Button>
      </aside>
      <section className='information-section'>
        <Informations />
      </section>
    </Container>
  );
}
export default Settings;
