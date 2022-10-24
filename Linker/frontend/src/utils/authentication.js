import React, { createContext, useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';
const AuthenticateContext = createContext({
  user: {},
  accessToken: '',
  isLoggedIn: false,
  onLogin: ({ token, user }) => {},
  onLogout: () => {}
});

export const Authentication = (props) => {
  const { sendRequest } = useHttp();
  const [user, setUser] = useState({
    user_id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username')
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const isUserLoggedIn = !!accessToken;

  const loginHandler = (token, user) => {
    setAccessToken(token);
    setUser(user);

    localStorage.setItem('user_id', user.user_id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('accessToken', token);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
  };
  const contextValue = {
    user: user,
    accessToken: accessToken,
    isLoggedIn: isUserLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler
  };

  return (
    <AuthenticateContext.Provider value={contextValue}>
      {props.children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateContext;
