import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authenticate from '../Authentication/auth';
import Signup from './Forms/Signup';
import Signin from './Forms/Signin';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import '../css/App.css';

const App = () => {
  const authCtx = useContext(Authenticate);
  return authCtx.isLoggedIn ? (
    <>
      <Header />
      <Route path='/' exact>
        <Redirect to='/home' />
      </Route>
      <Route path='/'>
        <Main />
      </Route>
      <Footer />
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
