import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages';
import Notification from '../pages/Notification';
import Settings from '../pages/Settings';
import Account from '../pages/Account';
import Information from '../pages/Information';
import Conversation from '../pages/Messages/Conversation/Conversation';
import classes from '../css/Main.module.css';

const Main = ({ user_id, windowSize }) => {
  return (
    <main className={classes.main}>
      <Switch>
        <Route path='/home' exact>
          <Home title='Home-Page' user_id={user_id} />
        </Route>
        <Route path='/profile/:username' exact>
          <Profile title='Profile-Page' user_id={user_id} />
        </Route>
        <Route path='/messages' exact={windowSize <= 600 && true}>
          <Messages
            title='Messages-Page'
            user_id={user_id}
            windowSize={windowSize}
          />
        </Route>
        <Route path='/settings' exact={windowSize <= 600 && true}>
          <Settings title='Settings-Page' windowSize={windowSize} />
        </Route>
        <Route path='/notifications'>
          <Notification title='Notifications-Page' />
        </Route>

        <Route path='/messages/:username/:phone-screen' exact>
          <Conversation user_id={user_id} />
        </Route>
        <Route path='/settings/notification/:phone-screen' exact>
          <Notification title='Notifications-Page' windowSize={windowSize} />
        </Route>
        <Route path='/settings/information/:phone-screen' exact>
          <Information title='Information-Page' windowSize={windowSize} />
        </Route>
        <Route path='/settings/account/:phone-screen' exact>
          <Account title='Account-Page' windowSize={windowSize} />
        </Route>
      </Switch>
    </main>
  );
};
export default Main;
