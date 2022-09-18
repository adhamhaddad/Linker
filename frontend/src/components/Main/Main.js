import React from 'react';
import Logo from '../Header/Logo/Logo';
import SearchBar from '../Header/Search/Searchbar';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Messages from '../Messages/Messages';
import Notification from '../Notification/Notification';
import Settings from '../Settings/Settings';
import './Main.css';

function Main(props) {
  if (props.switchComponent === 'HOME') {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <div className='top-container'>
            <Logo />
            <SearchBar />
          </div>
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
  }
  else if (props.switchComponent === 'PROFILE') {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <div className='top-container'>
            <Logo />
            <SearchBar />
          </div>
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
  else if (props.switchComponent === 'MESSAGES') {
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
  }
  else if (props.switchComponent === 'NOTIFICATIONS') {
    return (
      <main className='main notifications'>
        {window.innerWidth <= '600' && (
          <div className='top-container'>
            <Logo />
            <SearchBar />
          </div>
        )}
        <Notification title='Notification Page' />
      </main>
    );
  }
  else if (props.switchComponent === 'SETTINGS') {
    return (
      <main className='main settings'>
        <Settings />
      </main>
    );
  } else {
    return (
      <main className='main'>
        {window.innerWidth <= '600' && (
          <div className='top-container'>
            <Logo />
            <SearchBar />
          </div>
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
