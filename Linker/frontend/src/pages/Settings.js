import React, { useContext } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import WindowContext from '../store/windowSize';
import Container from '../components/UI/Container';
import Information from './Information';
import Account from './Account';
import classes from '../css/Settings.module.css';

function Settings() {
  const windowCtx = useContext(WindowContext);
  return (
    <Container className='settings'>
      <div className={classes.settings}>
        <section className={classes.menu}>
          <ul>
            <li>
              <NavLink
                activeClassName={classes.active}
                to={
                  windowCtx.windowSize <= 600
                    ? '/information'
                    : '/settings/information'
                }
                title='Information'
              >
                <i className='fa-solid fa-circle-info'></i>
                <span>information</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to={
                  windowCtx.windowSize <= 600 ? '/privacy' : '/settings/privacy'
                }
                title='Privacy & Security'
              >
                <i className='fa-solid fa-shield-halved'></i>
                <span>privacy & security</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to='/settings/emails'
                title='Emails'
              >
                <i className='fa-solid fa-envelope'></i>
                <span>emails</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to='/settings/notifications'
                title='Notifications'
              >
                <i className='fa-solid fa-bell'></i>
                <span>notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to='/settings/language'
                title='Language'
              >
                <i className='fa-solid fa-language'></i>
                <span>language</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to={
                  windowCtx.windowSize <= 600 ? '/account' : '/settings/account'
                }
                title='Account'
              >
                <i className='fa-solid fa-circle-user'></i>
                <span>account</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={classes.active}
                to='/settings/help'
                title='Help'
              >
                <i className='fa-solid fa-circle-question'></i>
                <span>help</span>
              </NavLink>
            </li>
          </ul>
        </section>
        <section className={classes['right-section']}>
          <Route path='/settings/information'>
            <Information />
          </Route>
          <Route path='/settings/privacy'>
            <Information />
          </Route>
          <Route path='/settings/emails'>
            <Information />
          </Route>
          <Route path='/settings/language'>
            <Information />
          </Route>
          <Route path='/settings/account'>
            <Account />
          </Route>
          <Route path='/settings/help'>
            <Information />
          </Route>
        </section>
      </div>
    </Container>
  );
}
export default Settings;