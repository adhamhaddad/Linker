import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import SpinnerLoading from './Loading/Spinner';
import classes from '../css/Main.module.css';

const Home = lazy(() => import('../pages/Home'));
const Profile = lazy(() => import('../pages/Profile'));
const Requests = lazy(() => import('../pages/Requests'));
const Messages = lazy(() => import('../pages/Messages'));
const Settings = lazy(() => import('../pages/Settings'));
const Account = lazy(() => import('../pages/Account'));
const Information = lazy(() => import('../pages/Information'));
const Theme = lazy(() => import('../pages/Theme'));
const Conversation = lazy(() => import('../components/Messages/Conversation'));
const Post = lazy(() => import('../pages/Post'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Language = lazy(() => import('../pages/Language'));

const Main = ({ user_id, username, socket, translation }) => {
  return (
    <main className={classes.main}>
      <Suspense fallback={<SpinnerLoading />}>
        <Switch>
          <Route path='/home' exact>
            <Home
              title='Home-Page'
              user_id={user_id}
              username={username}
              socket={socket}
            />
          </Route>
          <Route path='/profile/:username' exact>
            <Profile
              title='Profile-Page'
              user_id={user_id}
              username={username}
              socket={socket}
            />
          </Route>
          <Route path='/requests' exact>
            <Requests socket={socket} />
          </Route>

          <Route path='/messages'>
            <Messages
              title='Messages-Page'
              user_id={user_id}
              username={username}
              socket={socket}
            />
          </Route>
          {/* <Route path='/messages/:username'>
            <Conversation user_id={user_id} socket={socket} />
          </Route> */}

          <Route path='/notifications'>
            <Notifications />
          </Route>

          <Route path='/settings' exact>
            <Settings
              title='Settings-Page'
              username={username}
              translation={translation}
            />
          </Route>
          <Route path='/settings/information' exact>
            <Information title='Information-Page' />
          </Route>
          <Route path='/settings/language' exact>
            <Language />
          </Route>
          <Route path='/settings/account' exact>
            <Account title='Account-Page' />
          </Route>
          <Route path='/settings/theme' exact>
            <Theme />
          </Route>
          <Route path='/:username/:post_id' exact>
            <Post socket={socket} />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};
export default Main;
