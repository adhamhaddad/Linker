import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Container from '../components/UI/Container';
import Information from './Information';
import Theme from './Theme';
import Account from './Account';
import UnderDevelopment from './NotAvailable';
import Language from './Language';
import classes from '../css/Settings.module.css';

function Settings({ windowSize, translation }) {
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
              title={translation('sidebar.information')}
            >
              <i className='fa-solid fa-info-circle'></i>
              {translation('sidebar.information')}
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
              title={translation('sidebar.privacy')}
            >
              <i className='fa-solid fa-lock'></i>
              {translation('sidebar.privacy')}
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
              title={translation('sidebar.email')}
            >
              <i className='fa-regular fa-envelope'></i>
              {translation('sidebar.email')}
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
              title={translation('sidebar.notifications')}
            >
              <i className='fa-regular fa-bell'></i>
              {translation('sidebar.notifications')}
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
              title={translation('sidebar.language')}
            >
              <i className='fa-solid fa-language'></i>
              {translation('sidebar.language')}
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
              title={translation('sidebar.theme')}
            >
              <i className='fa-regular fa-image'></i>
              {translation('sidebar.theme')}
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
              title={translation('sidebar.account')}
            >
              <i className='fa-regular fa-user'></i>
              {translation('sidebar.account')}
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
              title={translation('sidebar.help')}
            >
              <i className='fa-regular fa-question-circle'></i>
              {translation('sidebar.help')}
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
            <Language />
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
