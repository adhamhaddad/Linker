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
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const userData = {
    id: localStorage.getItem('user_id')
  };
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
  // Notification Part
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      username: 'Ahmed Emad',
      profile: './images/beso.jpg',
      time: 'Tue Sep 20 2022 12:30:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 2,
      username: 'Mohamed Khaled',
      profile: './images/simba.jpeg',
      time: 'Tue Sep 20 2022 12:31:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 3,
      username: 'Bassem Hamada',
      profile: './images/bassem.jpg',
      time: 'Tue Sep 20 2022 12:32:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has commented on your post'
    },
    {
      id: 4,
      username: 'Cup Coffee',
      profile: './images/coffee.jpg',
      time: 'Tue Sep 20 2022 12:34:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    }
  ]);

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

  const getUser = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('http://192.168.1.6:3000/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userData.id })
      });
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
      const response = await fetch('http://192.168.1.6:3000/user/information', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userData.id })
      });
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

  const getUserPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('http://192.168.1.6:3000/user/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userData.id })
      });
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
      setUserPosts(transformPost);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAllPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('http://192.168.1.6:3000/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userData.id })
      });
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
      setAllPosts(transformPost);
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
    await fetch('http://192.168.1.6:3000/user/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    });
  };

  const addNewMessageHandler = async (e) => {
    await fetch('http://192.168.1.6:3000/user/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    });
  };

  const setPostReactions = async (e) => {
    await fetch('http://192.168.1.6:3000/user/posts', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(e)
    });
  };

  const deletePostHandler = async (e) => {
    await fetch('http://192.168.1.6:3000/user/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    });
    console.log(JSON.stringify(e));
  };

  useEffect(() => {
    getUser();
    getInformation();
    getUserPosts();
    getAllPosts();
  }, [getUser, getInformation, getUserPosts, getAllPosts]);

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
            user={user}
            information={information}
            userPosts={userPosts}
            allPosts={allPosts}
            reactions={reactions}
            notificationsList={notificationsList}
            setReactions={setPostReactions}
            addNewPost={addNewPost}
            receiverUser={receiverUser}
            senderUser={senderUser}
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
