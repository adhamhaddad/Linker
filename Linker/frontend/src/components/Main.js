import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages';
import Notification from '../pages/Notifications';
import Settings from '../pages/Settings';
import Account from '../pages/Account';
import Information from '../pages/Information';
import Conversation from './Messages/Conversation';
import UnderDevelopment from '../pages/NotAvailable';
import Requests from '../pages/Requests';
import classes from '../css/Main.module.css';

const Main = ({ user_id, username, windowSize }) => {
  return (
    <main className={classes.main}>
      <Switch>
        <Route path='/home' exact>
          <Home
            title='Home-Page'
            user_id={user_id}
            username={username}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/profile/:username' exact>
          <Profile
            title='Profile-Page'
            user_id={user_id}
            username={username}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/friend-request' exact>
          <Requests user_id={user_id} />
        </Route>
        <Route path='/messages' exact={windowSize <= 600 && true}>
          <Messages
            title='Messages-Page'
            user_id={user_id}
            username={username}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/messages/:username/:phone-screen' exact>
          <Conversation user_id={user_id} />
        </Route>
        <Route path='/notifications'>
          <UnderDevelopment />
        </Route>

        <Route path='/settings' exact={windowSize <= 600 && true}>
          <Settings
            title='Settings-Page'
            username={username}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/settings/information/:phone-screen' exact>
          <Information
            title='Information-Page'
            username={username}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/settings/privacy/:phone-screen' exact>
          <UnderDevelopment />
        </Route>
        <Route path='/settings/emails/:phone-screen' exact>
          <UnderDevelopment />
        </Route>
        <Route path='/settings/notifications/:phone-screen' exact>
          <UnderDevelopment />
        </Route>
        <Route path='/settings/language/:phone-screen' exact>
          <UnderDevelopment />
        </Route>
        <Route path='/settings/account/:phone-screen' exact>
          <Account
            title='Account-Page'
            windowSize={windowSize}
            username={username}
          />
        </Route>
        <Route path='/settings/help/:phone-screen' exact>
          <UnderDevelopment />
        </Route>
      </Switch>
    </main>
  );
};
export default Main;
