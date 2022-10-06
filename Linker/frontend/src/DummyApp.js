import React, { useState, useContext, useEffect, useCallback } from 'react';
import Signup from './components/Forms/Signup';
import Signin from './components/Forms/Signin';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authenticate from './Authentication/auth';
import * as API from './API';

function App() {
  const ctx = useContext(Authenticate);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [switchComponent, setSwitchComponent] = useState('');
  const [switchForm, setSwitchForm] = useState(false);
    
  const addNewPost = (e) => {
    console.log('done');
  };
  const setPostReactions = (e) => {
    console.log('done');
  };
  const addNewMessageHandler = (e) => {
    console.log('done');
  };

  const deletePostHandler = (e) => {
    console.log('done');
  };
  const switchFormHandler = (e) => {
    setSwitchForm(e);
  };

  const changeComponent = (e) => {
    localStorage.setItem('currentComponent', e.toUpperCase());
    setSwitchComponent(e.toUpperCase());
  };

  if (ctx.isLoggedIn) {
    return (
      <>
        <Header
          changeComponent={changeComponent}
          activeComponent={localStorage.getItem('currentComponent')}
        />
        {isLoading ? (
          <Main loading={isLoading} />
        ) : (
          <Main
            changeComponent={changeComponent}
            error={isError}
            loading={isLoading}
            user={API.user}
            information={API.user}
            userPosts={API.userPosts}
            allPosts={API.allPosts}
            reactions={API.reactions}
            notificationsList={API.notificationsList}
            setReactions={setPostReactions}
            addNewPost={addNewPost}
            receiverUser={API.receiverUser}
            senderUser={API.senderUser}
            addNewMessageHandler={addNewMessageHandler}
            deletePostHandler={deletePostHandler}
          />
        )}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {switchForm ? (
          <Signup
            title='Signup Page'
            register={true}
            switchForm={switchFormHandler}
          />
        ) : (
          <Signin
            title='Signin Page'
            login={true}
            onError={ctx.onAuthError}
            switchForm={switchFormHandler}
          />
        )}
      </>
    );
  }
}
export default App;
