import React, { useState, useContext } from 'react';
import Signup from './components/Forms/Signup';
import Signin from './components/Forms/Signin';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authenticate from './Authentication/auth';

function App() {
  const ctx = useContext(Authenticate);
  const [switchComponent, setSwitchComponent] = useState('');
  const [switchForm, setSwitchForm] = useState(false);

  // API DUMMY DATA
  const [user, setUser] = useState({
    id: '1',
    username: 'adhamhaddad',
    email: 'adham@gmail.com',
    gender: 'male',
    joined: '08/31/2022, 09:48:16 AM'
  });
  const [photos, setPohotos] = useState({
    cover: './images/ae177f7f-8928-4a1b-afab-6957d5aeb1c3/cover/linked.png',
    profile: './images/ae177f7f-8928-4a1b-afab-6957d5aeb1c3/profile/profile.jpg'
  });
  const [information, setInfomation] = useState({
    fname: 'adham',
    lname: 'ashraf',
    phone: '01113833449',
    birthday: '08/02/2002',
    work: 'the sparks foundation',
    relation: 'single',
    education: 'information systems',
    lives: 'giza, egypt',
    story:
      'Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer and Advanced Full-Stack Web Developer. I worked too hard to achieve this progress, its my passion and I need an opportunity to show myself.'
  });
  const [links, setLinks] = useState({
    telegram: 'https://t.me/adhamhaddad',
    linkedin: 'https://www.linkedin.com/in/adhamashraf/',
    twitter: 'https://twitter.com/AdhamHaddad_'
  });
  const [posts, setPosts] = useState([
    {
      id: 3,
      timedate:
        'Tue Sep 13 2022 17:30:31 GMT+0200 (Eastern European Standard Time)',
      content: {
        caption:
          'In our memories will always remember that day after the last final exam in 2nd secondary year on the first of Ramadan month with Simba and Ahmed we laughed so much at this day.',
        img: './posts/brothers.jpg',
        video: ''
      },
      reactions: {
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
      }
    },
    {
      id: 2,
      timedate:
        'Fri Sep 10 2022 12:30:31 GMT+0200 (Eastern European Standard Time)',
      content: {
        caption:
          'In the cinema with some one we dont know him but its a great day with mohanad that always laugh on anything and hema wants to kill him',
        img: './posts/beso2.jpg',
        video: ''
      },
      reactions: {
        likes: [
          { profile: './images/profile.jpg', username: 'Adham Ashraf' },
          { profile: './images/beso.jpg', username: 'Ahmed Emad' },
          { profile: './images/simba.jpeg', username: 'Mohamed Khaled' },
          { profile: './images/bassem.jpg', username: 'Bassem Hamada' }
        ],
        comments: [
          {
            id: '2',
            username: 'Ahmed Emad',
            profile: './images/beso.jpg',
            content: 'HAHAHA my stomack hurts',
            time: 'Sun Sep 11 2022 13:12:31 GMT+0200 (Eastern European Standard Time)'
          }
        ],
        shares: [{ profile: './images/beso.jpg', username: 'Ahmed Emad' }]
      }
    },
    {
      id: 1,
      timedate:
        'Fri Sep 10 2022 14:12:31 GMT+0200 (Eastern European Standard Time)',
      content: {
        caption: 'I love you so much. I will never cheat you my lovely coffee!',
        img: './posts/girlfriend.jpg',
        video: ''
      },
      reactions: {
        likes: [
          { profile: './images/profile.jpg', username: 'Adham Ashraf' },
          { profile: './images/beso.jpg', username: 'Ahmed Emad' },
          { profile: './images/simba.jpeg', username: 'Mohamed Khaled' },
          { profile: './images/bassem.jpg', username: 'Bassem Hamada' },
          { profile: './images/mrym.png', username: 'Mariam Maged' },
          { profile: './images/coffee.jpg', username: 'Cup Coffee' }
        ],
        comments: [
          {
            id: '2',
            username: 'Mariam Maged',
            profile: './images/mrym.png',
            content: 'Congrats Adham',
            time: 'Mon Sep 12 2022 12:12:31 GMT+0200 (Eastern European Standard Time)'
          },
          {
            id: '1',
            username: 'Cup Coffee',
            profile: './images/coffee.jpg',
            content: 'My baby so cute. I love you more ❤️❤️❤️',
            time: 'Fri Sep 10 2022 14:12:31 GMT+0200 (Eastern European Standard Time)'
          }
        ],
        shares: [
          { profile: './images/beso.jpg', username: 'Ahmed Emad' },
          { profile: './images/simba.jpeg', username: 'Mohamed Khaled' },
          { profile: './images/bassem.jpg', username: 'Bassem Hamada' }
        ]
      }
    }
  ]);
  // Notification Part
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      username: 'Mariam Maged',
      profile: './images/mrym.png',
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
      username: 'Ahmed Emad',
      profile: './images/beso.jpg',
      time: 'Tue Sep 20 2022 12:33:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    },
    {
      id: 5,
      username: 'Cup Coffee',
      profile: './images/coffee.jpg',
      time: 'Tue Sep 20 2022 12:34:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    }
  ]);

  // Chat - Messages Part
  const [receiverUser, setReceiverUser] = useState({
    username: 'mariam maged',
    profile: './images/mrym.png',
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

  const addNewMessageHandler = (e) => {
    setSenderUser((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, e]
      };
    });
  };

  const addNewPost = (e) => {
    setPosts((prev) => {
      return [e, ...prev];
    });
  };
  const setReactions = (e) => {
    setPosts((prev) => {
      return [
        posts,
        {
          comments: [
            posts.reactions.comments,
            {
              id: new Date().getTime(),
              username: 'Mariam Maged',
              profile: './images/mrym.png',
              content: e,
              time: new Date().toLocaleString('en-US')
            }
          ]
        }
      ];
    });
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
        <Main
          user={user}
          posts={posts}
          photos={photos}
          information={information}
          links={links}
          setReactions={setReactions}
          addNewPost={addNewPost}
          changeComponent={changeComponent}
          receiverUser={receiverUser}
          senderUser={senderUser}
          notificationsList={notificationsList}
          addNewMessageHandler={addNewMessageHandler}
        />
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
