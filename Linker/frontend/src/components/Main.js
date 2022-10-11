import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages/Messages';
import Notification from '../pages/Notification/Notification';
import Settings from '../pages/Settings/Settings';
import classes from '../css/Main.module.css';

function Main() {
  return (
    <main className={classes.main}>
      <Route path='/home'>
        <Home title='Home-Page' />
      </Route>
      <Route path='/profile'>
        <Profile title='Profile-Page' />
      </Route>
      <Route path='/messages'>
        <Messages title='Messages-Page' />
      </Route>
      <Route path='/notifications'>
        <Notification title='Notifications-Page' />
      </Route>
      <Route path='/settings'>
        <Settings title='Settings-Page' />
      </Route>
    </main>
  );
}
export default Main;
