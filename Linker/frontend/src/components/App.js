import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Authenticate from '../utils/authentication';
import WindowContext from '../store/windowSize';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Header from './Header';
import Main from './Main';
// import io from 'socket.io-client';
import '../css/App.css';
// const socket = io.connect('http://192.168.1.6:8000');
const App = () => {
  const authCtx = useContext(Authenticate);
  const windowSize = useContext(WindowContext);

  return authCtx.isLoggedIn ? (
    <>
      <Header
        user_id={authCtx.user.user_id}
        username={authCtx.user.username}
        windowSize={windowSize.windowSize}
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
          />
        </Route>
      </Switch>
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
