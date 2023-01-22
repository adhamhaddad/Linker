import React, { createContext } from 'react';

const apiUrlContext = createContext({
  url: ''
});
export const ApiURL = ({ children }) => {
  //! IMPORTANT. replace 192.168.1.6 with your IP. you can find it in the terminal message
  //! Keep the port to 4000. don't change it
  const data = {
    url: 'http://172.160.14.161:4000'
  };
  return (
    <apiUrlContext.Provider value={data}>{children}</apiUrlContext.Provider>
  );
};

export default apiUrlContext;
