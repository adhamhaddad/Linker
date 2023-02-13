import React, { createContext, useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';

const userContext = createContext({
  user_id: '',
  fname: '',
  lname: ''
});

export const UserContextProvider = (props) => {
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const [userData, setUserData] = useState({
    fname: localStorage.getItem('fname'),
    lname: localStorage.getItem('lname')
  });

  const userValues = {
    user_id: userData.username,
    fname: userData.fname,
    lname: userData.lname
  };

  const userInfo = (data) => {
    setUserData(data);
    localStorage.setItem('fname', data.fname);
    localStorage.setItem('lname', data.lname);
  };
  useEffect(() => {
    sendRequest(
      `user/information?user_id=${userContext.user_id}`,
      'GET',
      {},
      userInfo
    );
  }, []);

  return (
    <userContext.Provider value={userValues}>
      {props.children}
    </userContext.Provider>
  );
};
export default userContext;
