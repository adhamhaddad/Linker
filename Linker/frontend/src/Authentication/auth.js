import React, { createContext, useState, useEffect } from 'react';

const Authenticate = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onSignup: (data) => {},
  onAuthError: { authError: false, setAuthError: () => {} },
  user: {}
});

export function Authentication(props) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') == '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (e, p) => {
    const response = await fetch('http://192.168.1.6:3000/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: e, password: p })
    });
    const data = await response.json();
    if (!data.status) {
      setAuthError(true);
      return;
    }
    localStorage.setItem('user_id', data.data.user_id);
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('currentComponent', 'PROFILE');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('currentComponent');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const signupHandler = async (user) => {
    const response = await fetch('http://192.168.1.6:3000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await response.json();

    if (!data.status) {
      setAuthError(true);
      return;
    }
  };

  return (
    <Authenticate.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onSignup: signupHandler,
        onAuthError: { authError: authError, setAuthError: setAuthError },
        user: user
      }}
    >
      {props.children}
    </Authenticate.Provider>
  );
}

export default Authenticate;
