import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Container from '../components/UI/Container';
import Information from './Information';
import Theme from './Theme';
import Account from './Account';
import UnderDevelopment from './NotAvailable';
import classes from '../css/Settings.module.css';

function Settings({ windowSize }) {
  return (
    <Container className='settings'>
      <section className={classes['settings-navigation']}>
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
              <i className='fa-solid fa-info-circle'></i>
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
              <i className='fa-solid fa-lock'></i>
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
              <i className='fa-solid fa-envelope'></i>
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
              <i className='fa-solid fa-bell'></i>
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
              <i className='fa-solid fa-language'></i>
              language
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to={
                windowSize <= 600
                  ? '/settings/theme/phone-screen'
                  : '/settings/theme'
              }
              title='Theme'
            >
              <i className='fa-solid fa-image'></i>
              theme
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
              <i className='fa-solid fa-user'></i>
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
              <i className='fa-solid fa-question-circle'></i>
              help
            </NavLink>
          </li>
        </ul>
      </section>
      {windowSize > 600 && (
        <section className={classes['settings-section']}>
          <Route path='/settings/information' exact>
            <Information windowSize={windowSize} />
          </Route>
          <Route path='/settings/privacy' exact>
            <UnderDevelopment color='light' />
          </Route>
          <Route path='/settings/emails' exact>
            <UnderDevelopment color='light' />
          </Route>
          <Route path='/settings/notifications' exact>
            <UnderDevelopment color='light' />
          </Route>
          <Route path='/settings/language' exact>
            <UnderDevelopment color='light' />
          </Route>
          <Route path='/settings/theme' exact>
            <Theme windowSize={windowSize} />
          </Route>
          <Route path='/settings/account' exact>
            <Account windowSize={windowSize} />
          </Route>
          <Route path='/settings/help' exact>
            <UnderDevelopment color='light' />
          </Route>
        </section>
      )}
    </Container>
  );
}
export default Settings;
