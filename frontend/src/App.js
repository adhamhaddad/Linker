import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Authenticate from './utils/authentication';
import apiUrlContext from './utils/api-urls';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Header from './components/Header/Header';
import MiniNavigationBar from './components/Header/MiniNavigationBar';
import Main from './components/Main';
import io from 'socket.io-client';
import './css/App.css';

const App = () => {
  const apiCtx = useContext(apiUrlContext);
  const socket = io.connect(apiCtx.url);
  const authCtx = useContext(Authenticate);
  const { t: translation } = useTranslation();

  return authCtx.isLoggedIn ? (
    <>
      <Header socket={socket} translation={translation} />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/'>
          <Main
            user_id={authCtx.user.user_id}
            username={authCtx.user.username}
            socket={socket}
            translation={translation}
          />
        </Route>
      </Switch>
      <MiniNavigationBar />
    </>
  ) : (
    <>
      <Route path='/signup' exact>
        <Signup title='Signup Page' />
      </Route>
      <Route path='/signin' exact>
        <Signin title='Signin Page' />
      </Route>
      <Route path='*'>
        <Redirect to='/signin' exact />
      </Route>
    </>
  );
};
export default App;
