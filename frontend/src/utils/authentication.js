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
    profile_picture: localStorage.getItem('profile'),
    username: localStorage.getItem('username'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('first_name')
  });
  const [theme, setTheme] = useState({
    profile_cover: localStorage.getItem('profile_cover')
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const isUserLoggedIn = !!accessToken;

  const loginHandler = (token, user, theme) => {
    setAccessToken(token);
    setUser(user);
    setTheme(theme);

    localStorage.setItem('user_id', user.user_id);
    localStorage.setItem(
      'profile',
      user.profile_picture === null ? 'null' : user.profile_picture
    );
    localStorage.setItem('username', user.username);
    localStorage.setItem('first_name', user.first_name);
    localStorage.setItem('last_name', user.last_name);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('profile_cover', theme.profile_cover);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('profile');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('profile_cover');
  };
  const contextValue = {
    user: user,
    theme: theme,
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
