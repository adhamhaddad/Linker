import React, { createContext, useState } from 'react';

const WindowContext = createContext({
  windowSize: ''
});

export const WindowSize = (props) => {
  const [isWindowResized, setIsWindowResized] = useState(window.innerWidth);

  const onWindowResizeHandler = (e) => {
    setIsWindowResized(e);
  };

  return (
    <>
      {window.addEventListener('resize', () => {
        const width = window.innerWidth;
        onWindowResizeHandler(width);
      })}
      <WindowContext.Provider
        value={{
          windowSize: isWindowResized
        }}
      >
        {props.children}
      </WindowContext.Provider>
    </>
  );
};
export default WindowContext;
