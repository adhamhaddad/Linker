import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Container from '../components/UI/Container';
import Information from './Information';
import Account from './Account';
import classes from '../css/Settings.module.css';

function Settings({ windowSize }) {
  return (
    <Container className='settings'>
      <section className={classes.menu}>
        <ul>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/information/phone-screen'
                  : '/settings/information'
              }
              title='Information'
            >
              information
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/privacy/phone-screen'
                  : '/settings/privacy'
              }
              title='Privacy & Security'
            >
              privacy & security
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/emails/phone-screen'
                  : '/settings/emails'
              }
              title='Emails'
            >
              emails
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/notifications/phone-screen'
                  : '/settings/notifications'
              }
              title='Notifications'
            >
              notifications
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/language/phone-screen'
                  : '/settings/language'
              }
              title='Language'
            >
              language
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/account/phone-screen'
                  : '/settings/account'
              }
              title='Account'
            >
              account
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/help/phone-screen'
                  : '/settings/help'
              }
              title='Help'
            >
              help
            </NavLink>
          </li>
        </ul>
      </section>
      <Route path='/settings/information' exact>
        <Information windowSize={windowSize} />
      </Route>
      <Route path='/settings/privacy' exact>
        <Information windowSize={windowSize} />
      </Route>
      <Route path='/settings/emails' exact>
        <Information windowSize={windowSize} />
      </Route>
      <Route path='/settings/language' exact>
        <Information windowSize={windowSize} />
      </Route>
      <Route path='/settings/account' exact>
        <Account windowSize={windowSize} />
      </Route>
      <Route path='/settings/help' exact>
        <Information windowSize={windowSize} />
      </Route>
    </Container>
  );
}
export default Settings;
