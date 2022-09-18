import React from 'react';
import Logo from '../Header/Logo/Logo';
import SearchBar from '../Header/Search/Searchbar';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Messages from '../Messages/Messages';
import Notification from '../Notification/Notification';
import Settings from '../Settings/Settings';
import TopNavbar from '../Header/TopNavbar/TopNavbar';
import './Main.css';

function Main(props) {
  if (localStorage.getItem('currentComponent') === 'HOME') {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <Logo />
            <SearchBar />
          </TopNavbar>
        )}
        <Home
          user={props.user}
          posts={props.posts}
          photos={props.photos}
          information={props.information}
          links={props.links}
          setReactions={props.setReactions}
        />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'PROFILE') {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <Logo />
            <SearchBar />
          </TopNavbar>
        )}
        <Profile
          title='Profile-Page'
          user={props.user}
          posts={props.posts}
          photos={props.photos}
          information={props.information}
          links={props.links}
          setReactions={props.setReactions}
          addNewPost={props.addNewPost}
        />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'MESSAGES') {
    return (
      <main className='main chat'>
        <Messages
          title='Messages-Page'
          user={props.user}
          posts={props.posts}
          photos={props.photos}
        />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'NOTIFICATIONS') {
    return (
      <main className='main notifications'>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <Logo />
            <SearchBar />
          </TopNavbar>
        )}
        <Notification title='Notification Page' />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'SETTINGS') {
    return (
      <main className='main settings'>
        <Settings />
      </main>
    );
  } else {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <Logo />
            <SearchBar />
          </TopNavbar>
        )}
        <Profile
          title='Profile-Page'
          user={props.user}
          posts={props.posts}
          photos={props.photos}
          information={props.information}
          links={props.links}
          setReactions={props.setReactions}
          addNewPost={props.addNewPost}
        />
      </main>
    );
  }
}
export default Main;
