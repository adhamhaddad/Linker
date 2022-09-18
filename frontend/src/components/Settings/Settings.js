import React, { useContext } from 'react';
import Informations from './Information/Information';
import Authenticate from '../../Authentication/auth';
import Button from '../UI/Button/Button';
import Container from '../UI/Container/Container';
import './Settings.css';

function Settings(props) {
  const ctx = useContext(Authenticate);
  const settingsClickHandler = (e) => {
    e.preventDefault();
    props.changeComponent(e.target.title);
  };

  return (
    <Container className='settings'>
      <aside>
        <ul>
          <li>
            <a href='#' onClick={settingsClickHandler} title='Information'>
              <i className='fa-solid fa-circle-info' title='Information'></i>
              <span title='Information'>information</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={settingsClickHandler} title='Privacy'>
              <i className='fa-solid fa-shield-halved' title='Privacy'></i>
              <span title='Privacy'>privacy & security</span>
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
            <a href='#' onClick={settingsClickHandler} title='Account'>
              <i className='fa-solid fa-circle-user' title='Account'></i>
              <span title='Account'>account</span>
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
      {window.innerWidth > '600' && (
        <section className='information-section'>
          <Informations />
        </section>
      )}
    </Container>
  );
}
export default Settings;
