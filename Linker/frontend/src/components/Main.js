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
import { useState } from 'react';

const Main = () => {
  const [msgData, setMsgData] = useState({});
  const getMessageData = (e) => {
    setMsgData(e);
  };
  return (
    <main className={classes.main}>
      <Switch>
        <Route path='/home' exact>
          <Home title='Home-Page' />
        </Route>
        <Route path='/profile'>
          <Profile title='Profile-Page' />
        </Route>
        <Route path='/messages'>
          <Messages title='Messages-Page' />
        </Route>
        <Route path='/notifications' exact>
          <Notification title='Notifications-Page' />
        </Route>
        <Route path='/settings'>
          <Settings title='Settings-Page' />
        </Route>
        <Route path='/account' exact>
          <Account title='Settings-Page' />
        </Route>
        <Route path='/information' exact>
          <Information title='Settings-Page' />
        </Route>
      </Switch>
      {/* <Route path={`/messages/${msgData.username}`}>
        <Conversation
          user_id={msgData.user_id}
          receiver_id={msgData.user_id}
          receiver_fname={msgData.fname}
          receiver_lname={msgData.lname}
          receiver_username={msgData.username}
        />
      </Route> */}
    </main>
  );
};
export default Main;
