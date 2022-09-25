import React, { useState, useContext, useEffect, useCallback } from 'react';
import Signup from './components/Forms/Signup';
import Signin from './components/Forms/Signin';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authenticate from './Authentication/auth';

function App() {
  const ctx = useContext(Authenticate);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [switchComponent, setSwitchComponent] = useState('');
  const [switchForm, setSwitchForm] = useState(false);
  const [user, setUser] = useState({});
  const [information, setInformation] = useState({});
  const [posts, setPosts] = useState([]);
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
  const [notificationsList, setNotificationsList] = useState([]);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        'http://192.168.1.6:3000/user/39479323-e205-4746-b575-939a02d06191'
      );
      if (!response.ok) {
        throw new Error('Could not get the user');
      }
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getInformation = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        'http://192.168.1.6:3000/user/39479323-e205-4746-b575-939a02d06191/information'
      );
      if (!response.ok) {
        throw new Error('Could not get the user information');
      }
      const data = await response.json();
      setInformation(data.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        'http://192.168.1.6:3000/user/39479323-e205-4746-b575-939a02d06191/posts'
      );
      if (!response.ok) {
        throw new Error('Could not get the posts');
      }
      const data = await response.json();
      const transformPost = await data.data.map((post) => {
        return {
          id: post.post_id,
          timedate: post.timedate,
          content: {
            caption: post.caption,
            img: post.img,
            video: post.video
          },
          user_id: post.user_id
        };
      });
      setPosts(transformPost);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getReactions = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        'http://192.168.1.6:3000/user/404ac217-9ed3-4555-b9c0-a6177ca3f850/reactions'
      );
      if (!response.ok) {
        throw new Error('Could not get the post reactions');
      }
      const data = await response.json();
      const transformPost = await data.data.map((post) => {
        return {
          id: post.post_id,
          timedate: post.timedate,
          content: {
            caption: post.caption,
            img: post.img,
            video: post.video
          },
          user_id: post.user_id
        };
      });
      setPosts(transformPost);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMessages = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        'http://192.168.1.6:3000/user/902d8043-1c0e-4171-b975-0924b8dd7678/message'
      );
      if (!response.ok) {
        throw new Error('Could not get the messages');
      }
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const switchFormHandler = (e) => {
    setSwitchForm(e);
  };

  const changeComponent = (e) => {
    localStorage.setItem('currentComponent', e.toUpperCase());
    setSwitchComponent(e.toUpperCase());
  };

  const addNewPost = async (e) => {
    await fetch(
      'http://192.168.1.6:3000/user/39479323-e205-4746-b575-939a02d06191/posts',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e)
      }
    );
  };

  const addNewMessageHandler = async (e) => {
    await fetch(
      'http://192.168.1.6:3000/user/39479323-e205-4746-b575-939a02d06191/message',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: e
      }
    );
  };
  const setPostReactions = async (e) => {
    await fetch(
      'http://192.168.1.6:3000/user/posts/39479323-e205-4746-b575-939a02d06191',
      {
        method: 'POST',
        'Content-Type': 'application/json',
        body: e
      }
    );
  };

  useEffect(() => {
    getUser();
    getInformation();
    getPosts();
  }, [getUser, getInformation, getPosts]);

  if (ctx.isLoggedIn) {
    return (
      <>
        <Header
          changeComponent={changeComponent}
          activeComponent={localStorage.getItem('currentComponent')}
        />
        {isError && <p>Error happend. ${isError}</p>}
        {isLoading ? (
          <p className='loading'>Loading..</p>
        ) : (
          <Main
            changeComponent={changeComponent}
            error={isError}
            loading={isLoading}
            user={user}
            information={information}
            posts={posts}
            reactions={reactions}
            notificationsList={notificationsList}
            setReactions={setPostReactions}
            addNewPost={addNewPost}
            // receiverUser={receiverUser}
            // senderUser={senderUser}
            addNewMessageHandler={addNewMessageHandler}
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
