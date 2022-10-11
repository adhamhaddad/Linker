import React, { createContext, useState } from 'react';

const AuthenticateContext = createContext({
  accessToken: '',
  isLoggedIn: false,
  onLogin: (token) => {},
  onLogout: () => {}
});

export const Authentication = (props) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const isUserLoggedIn = !!accessToken;

  const loginHandler = (token) => {
    setAccessToken(token);
    
    localStorage.setItem('accessToken', token);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };
  const contextValue = {
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
