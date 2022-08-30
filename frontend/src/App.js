import React from 'react';
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
  const [user, setUser] = React.useState({});
  const [photos, setPohotos] = React.useState({});
  const [information, setInfomation] = React.useState({});
  const [links, setLinks] = React.useState({});
  const [posts, setPosts] = React.useState([]);
  const [reactions, setReactions] = React.useState({
    likes: ['Adham Ashraf', 'Mariam Maged'],
    comments: ['Nice post!', 'Great job!', 'Can i shares it ?'],
    shares: 16,
  });

  // User
  React.useEffect(() => {
    function getUser() {
      fetch('http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2')
        .then((res) => res.json())
        .then((user) => {
          setUser((prev) => {
            return {
              ...prev,
              id: user.data.id,
              username: user.data.username,
              email: user.data.email,
              gender: user.data.gender,
              joined: user.data.joined,
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
        `http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/photos`
      );
      const photo = await response.json();
      try {
        setPohotos((prev) => {
          return {
            ...prev,
            cover: photo.data.cover,
            profile: photo.data.profile,
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
        `http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/information`
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
            story: info.data.story,
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
        `http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/links`
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
            telegram: link.data.telegram,
          };
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getLinks();

    // Reactions
    async function getReactions() {
      /*
        const response = await fetch(`http://localhost:3000/user/${user.id}/posts/reactions`);
        const reactions = await response.json();
        try {
            setReactions(reactions.data)
        } catch (err) {console.log(err.message)}
      */
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
        `http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/posts`
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
