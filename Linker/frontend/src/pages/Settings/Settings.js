import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Informations from './Information/Information';
import Authenticate from '../../Authentication/auth';
import Button from '../../components/UI/Button/Button';
import Container from '../../components/UI/Container/Container';
import classes from './Settings.module.css';

function Settings() {
  const ctx = useContext(Authenticate);
  return (
    <Container className='settings'>
      <section className={classes.section}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to='/information' title='Information'>
              <i className='fa-solid fa-circle-info'></i>
              <span>information</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/privacy' title='Privacy & Security'>
              <i className='fa-solid fa-shield-halved'></i>
              <span>privacy & security</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/emails' title='Emails'>
              <i className='fa-solid fa-envelope'></i>
              <span>emails</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/notifications' title='Notifications'>
              <i className='fa-solid fa-bell'></i>
              <span>notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/language' title='Language'>
              <i className='fa-solid fa-language'></i>
              <span>language</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/account' title='Account'>
              <i className='fa-solid fa-circle-user'></i>
              <span>account</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/help' title='Help'>
              <i className='fa-solid fa-circle-question'></i>
              <span>help</span>
            </NavLink>
          </li>
        </ul>
        <Button onClick={ctx.onLogout} className={classes['logout-btn']}>
          logout
        </Button>
      </section>
      {window.innerWidth > '600' && (
        <section className={classes['information-section']}>
          <Informations />
        </section>
      )}
    </Container>
  );
}
export default Settings;
