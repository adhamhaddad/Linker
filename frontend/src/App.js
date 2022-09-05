import React, { useState, useEffect } from 'react';
import './App.css';
// import Home from './components/Home/Home';
// import Notification from './components/Notification/Notification';
// import Settings from './components/Settings/Settings';
// import Signup from './components/Forms/Signup';
// import Signin from './components/Forms/Signin';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
// import Messages from './components/Messages/Messages';
import Footer from './components/Footer/Footer';

function App() {
  const [user, setUser] = useState({});
  const [photos, setPohotos] = useState({});
  const [information, setInfomation] = useState({});
  const [links, setLinks] = useState({});
  const [posts, setPosts] = useState([]);
  // const postSQL = 'SELECT id, content, timedate FROM posts WHERE id=user_id';
  // const id = postSQL.data.id;
  // const reactionsSql = 'SELECT likes, comments, shares FROM reaction WHERE post_id=id';
  const [reactions, setReactions] = useState([
    {
      likes: ['Adham Ashraf', 'Ahmed Emad', 'Simba', 'Bassem Hamada', 'Mariam Maged'],
      comments: ['Nice post!', 'Great job!', 'Can i shares it ?', 'Fuck you'],
      shares: ['Simba', 'Ahmed', 'Bassem']
    },
    {
      likes: ['Adham Ashraf', 'Ahmed Emad'],
      comments: ['Nice post!', 'Great job!', 'Can i shares it ?'],
      shares: ['Simba', 'Ahmed', 'Bassem']
    },
    {
      likes: ['Adham Ashraf', 'Ahmed Emad', 'Simba'],
      comments: ['Nice post!', 'Great job!'],
      shares: ['Simba', 'Ahmed', 'Bassem']
    },
    {
      likes: ['Adham Ashraf', 'Ahmed Emad', 'Simba', 'Bassem Hamada'],
      comments: ['Nice post!', 'Great job!', 'Can i shares it ?', 'Fuck you'],
      shares: ['Simba', 'Ahmed', 'Bassem']
    }
  ]);

  useEffect(() => {
    setUser((prev) => {
      return {
        ...prev,
        id: '1',
        username: 'adhamhaddad',
        email: 'adham@gmail.com',
        gender: 'male',
        joined: '08/31/2022, 09:48:16 AM'
      };
    });

    setPohotos((prev) => {
      return {
        ...prev,
        cover: './images/ae177f7f-8928-4a1b-afab-6957d5aeb1c3/cover/linked.png',
        profile:
          './images/ae177f7f-8928-4a1b-afab-6957d5aeb1c3/profile/profile.jpg'
      };
    });

    setInfomation((prev) => {
      return {
        ...prev,
        fname: 'adham',
        lname: 'ashraf',
        phone: '01113833449',
        birthday: '08/02/2002',
        work: 'the sparks foundation',
        relation: 'single',
        education: 'information systems',
        lives: 'giza, egypt',
        story:
          'Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer and Advanced Full-Stack Web Developer. I worked too hard to achieve this progress, it\'s my passion and I need an opportunity to show myself.'
      };
    });
    setLinks((prev) => {
      return {
        ...prev,
        telegram: 'https://t.me/adhamhaddad',
        linkedin: 'https://www.linkedin.com/in/adhamashraf/',
        twitter: 'https://twitter.com/AdhamHaddad_'
      };
    });
    setPosts((prev) => {
      return [
        ...prev,
        {
          id: 1,
          timedate: 'Fri Sep 02 2022 14:12:31 GMT+0200 (Eastern European Standard Time)',
          content: 'Hello again. its me with another post!'
        },
        {
          id: 2,
          timedate: '08/31/2022, 10:02:30 AM',
          content: 'Hello Everyone!. its me again with a new post for test'
        },
        {
          id: 3,
          timedate: '08/31/2022, 12:29:55 PM',
          content:
            'Okay i will say it .. i cant ignore mariam . i love her so much!!❤️ ..'
        }
      ];
    });
  }, []);

  /*
  setReactions(prev => {
    return {
      ...prev,

    }
  })
  */
  /*
  // User
  React.useEffect(() => {
    function getUser() {
      fetch('http://localhost:3000/user/29becb51-fa37-467e-b37f-74b85b2a1018')
        .then((res) => res.json())
        .then((user) => {
          setUser((prev) => {
            return {
              ...prev,
              id: user.data.id,
              username: user.data.username,
              email: user.data.email,
              gender: user.data.gender,
              joined: user.data.joined
            };
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    getUser();

    // Photos
    async function getPhotos() {
      const response = await fetch(
        `http://localhost:3000/user/29becb51-fa37-467e-b37f-74b85b2a1018/photos`
      );
      const photo = await response.json();
      try {
        setPohotos((prev) => {
          return {
            ...prev,
            cover: photo.data.cover,
            profile: photo.data.profile
          };
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getPhotos();

    // Information
    async function getInformation() {
      const response = await fetch(
        `http://localhost:3000/user/29becb51-fa37-467e-b37f-74b85b2a1018/information`
      );
      const info = await response.json();
      try {
        setInfomation((prev) => {
          return {
            ...prev,
            fname: info.data.fname,
            lname: info.data.lname,
            phone: info.data.phone,
            birthday: info.data.birthday,
            work: info.data.work,
            relation: info.data.relation,
            education: info.data.education,
            lives: info.data.lives,
            story: info.data.story
          };
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getInformation();
    // Links
    async function getLinks() {
      const response = await fetch(
        `http://localhost:3000/user/29becb51-fa37-467e-b37f-74b85b2a1018/links`
      );
      const link = await response.json();
      try {
        setLinks((prev) => {
          return {
            ...prev,
            facebook: link.data.facebook,
            twitter: link.data.twitter,
            linkedin: link.data.linkedin,
            instagram: link.data.instagram,
            telegram: link.data.telegram
          };
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getLinks();

    // Reactions
    async function getReactions() {
        const response = await fetch(`http://localhost:3000/user/${user.id}/posts/reactions`);
        const reactions = await response.json();
        try {
            setReactions(reactions.data)
        } catch (err) {console.log(err.message)}
      const response = {
        comments: ['Good Job', 'Awesome Job!'],
        likes: ['Beso Emad', 'Bassem Hamada', 'Simba', 'Mariam Maged'],
        shares: 10
      };
      setReactions(response);
    }
    getReactions();

    // Posts
    async function getPosts() {
      const response = await fetch(
        `http://localhost:3000/user/29becb51-fa37-467e-b37f-74b85b2a1018/posts`
      );
      const post = await response.json();
      try {
        setPosts(post.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getPosts();
  }, []);
  */
  return (
    <>
      <Header />
      <Profile
        title='Profile Page'
        user={user}
        photos={photos}
        information={information}
        links={links}
        posts={posts}
        reactions={reactions}
      />
      <Footer />
      {/*
      <Messages title='Messages Page' />
            <Signup title='Signup Page' register={true}/>
            <Home title='Home Page'/>
            <Notification title='Notification Page'/>
            <Settings title='Settings Page'/>
            <Signin title='Signin Page' login={true}/>
            <Contact title='Contact Page'/>
        */}
    </>
  );
}
export default App;
