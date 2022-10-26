import React, { createContext, useState } from 'react';
const AuthenticateContext = createContext({
  user: {},
  accessToken: '',
  isLoggedIn: false,
  onLogin: ({ token, user }) => {},
  onLogout: () => {}
});

export const Authentication = (props) => {
  const [user, setUser] = useState({
    user_id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('first_name')
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
    localStorage.setItem('first_name', user.first_name);
    localStorage.setItem('last_name', user.last_name);
    localStorage.setItem('accessToken', token);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
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
