import React, { createContext } from 'react';

const apiUrlContext = createContext({
  url: ''
});
export const ApiURL = ({ children }) => {
  const data = {
    url: 'http://192.168.1.6:4000'
  };
  return (
    <apiUrlContext.Provider value={data}>{children}</apiUrlContext.Provider>
  );
};

export default apiUrlContext;
