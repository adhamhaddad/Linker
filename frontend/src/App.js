import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Authenticate from './utils/authentication';
import apiUrlContext from './utils/api-urls';
import WindowContext from './store/windowSize';
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
  const windowSize = useContext(WindowContext);
  return authCtx.isLoggedIn ? (
    <>
      <Header
        user_id={authCtx.user.user_id}
        socket={socket}
      />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/'>
          <Main
            user_id={authCtx.user.user_id}
            username={authCtx.user.username}
            windowSize={windowSize.windowSize}
            socket={socket}
          />
        </Route>
      </Switch>
      {windowSize.windowSize <= 600 && <MiniNavigationBar />}
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
