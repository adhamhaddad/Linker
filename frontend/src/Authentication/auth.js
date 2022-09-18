import React, { createContext, useState, useEffect } from 'react';

const Authenticate = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onAuthError: { authError: false, setAuthError: () => {} }
});

export function Authentication(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') == '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (e, p) => {
    // if (e !== 'adhamhaddad' || p !== 'adham123') {
    //     setAuthError(true);
    //   return;
    // }
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('currentComponent', 'PROFILE');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('currentComponent');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Authenticate.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onAuthError: { authError: authError, setAuthError: setAuthError }
      }}
    >
      {props.children}
    </Authenticate.Provider>
  );
}

export default Authenticate;
