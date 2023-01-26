import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import UnderDevelopment from '../pages/NotAvailable';
import SpinnerLoading from './Loading/Spinner';
import classes from '../css/Main.module.css';

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

const Main = ({ user_id, username, windowSize, socket, translation }) => {
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
              windowSize={windowSize}
              socket={socket}
            />
          </Route>
          <Route path='/requests' exact>
            <Requests socket={socket} />
          </Route>

          <Route path='/messages' exact={windowSize <= 600 && true}>
            <Messages
              title='Messages-Page'
              user_id={user_id}
              username={username}
              windowSize={windowSize}
              socket={socket}
            />
          </Route>
          <Route path='/messages/:username/:phone-screen' exact>
            <Conversation user_id={user_id} socket={socket} />
          </Route>

          <Route path='/notifications'>
            <UnderDevelopment />
            {/* <Notifications /> */}
          </Route>

          <Route path='/settings' exact={windowSize <= 600 && true}>
            <Settings
              title='Settings-Page'
              username={username}
              windowSize={windowSize}
              translation={translation}
            />
          </Route>
          <Route path='/settings/information/:phone-screen' exact>
            <Information title='Information-Page' />
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
            <Account title='Account-Page' />
          </Route>
          <Route path='/settings/help/:phone-screen' exact>
            <UnderDevelopment />
          </Route>
          <Route path='/settings/theme/:phone-screen' exact>
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
