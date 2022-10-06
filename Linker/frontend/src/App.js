import React, { useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Forms/Signup';
import Signin from './components/Forms/Signin';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authenticate from './Authentication/auth';

function App() {
  const ctx = useContext(Authenticate);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reactions, setReactions] = useState({
    likes: [
      { profile: './images/profile.jpg', username: 'Adham Ashraf' },
      { profile: './images/beso.jpg', username: 'Ahmed Emad' },
      { profile: './images/bassem.jpg', username: 'Bassem Hamada' },
      { profile: './images/simba.jpeg', username: 'Mohamed Khaled' }
    ],
    comments: [
      {
        id: '2',
        username: 'Ahmed Emad',
        profile: './images/beso.jpg',
        content: '❤️❤️',
        time: 'Tue Sep 13 2022 17:40:31 GMT+0200 (Eastern European Standard Time)'
      },
      {
        id: '1',
        username: 'Mohamed Khaled',
        profile: './images/simba.jpeg',
        content: '❤️❤️',
        time: 'Tue Sep 13 2022 17:35:31 GMT+0200 (Eastern European Standard Time)'
      }
    ],
    shares: [
      { profile: './images/beso.jpg', username: 'Ahmed Emad' },
      { profile: './images/simba.jpeg', username: 'Mohamed Khaled' }
    ]
  });
  const [messages, setMessages] = useState([]);

  // Chat - Messages Part
  const [receiverUser, setReceiverUser] = useState({
    username: 'Ahmed Emad',
    profile: './images/beso.jpg',
    messages: [
      {
        time: 'Tue Sep 20 2022 04:31:32 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      },
      {
        time: 'Tue Sep 20 2022 04:32:37 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      },
      {
        time: 'Tue Sep 20 2022 04:32:45 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      }
    ]
  });
  const [senderUser, setSenderUser] = useState({
    username: 'adham ashraf',
    profile: './images/profile.jpg',
    messages: [
      {
        time: 'Tue Sep 20 2022 04:31:31 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      },
      {
        time: 'Tue Sep 20 2022 04:32:35 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      },
      {
        time: 'Tue Sep 20 2022 04:32:41 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      },
      {
        time: 'Tue Sep 20 2022 04:36:31 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo',
        lang: 'en'
      }
    ]
  });

  const addNewPost = async (e) => {
    await fetch('http://192.168.1.6:3000/user/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    });
  };

  // const addNewMessageHandler = async (e) => {
  //   await fetch('http://192.168.1.6:3000/user/message', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(e)
  //   });
  // };
  const addNewMessageHandler = (e) => {
    setSenderUser();
  };

  const setPostReactions = async (e) => {
    await fetch('http://192.168.1.6:3000/user/posts', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(e)
    });
  };

  if (ctx.isLoggedIn) {
    return (
      <>
        <Header activeComponent={localStorage.getItem('currentComponent')} />
        {isLoading ? (
          <Main loading={isLoading} />
        ) : (
          <Main
            error={isError}
            loading={isLoading}
            reactions={reactions}
            setReactions={setPostReactions}
            receiverUser={receiverUser}
            senderUser={senderUser}
            addNewPost={addNewPost}
            addNewMessageHandler={addNewMessageHandler}
          />
        )}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Route path='/signup'>
          <Signup title='Signup Page' />
        </Route>
        <Route path='/signin'>
          <Signin title='Signin Page' />
        </Route>
      </>
    );
  }
}
export default App;
