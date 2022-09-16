import React from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Messages from '../Messages/Messages';
import SearchBar from '../Header/Search/Searchbar';
import Settings from '../Settings/Settings';
// import Notification from '../Notification/Notification';
import './Main.css';

function Main(props) {
  if (props.componentState === 'HOME') {
    return (
      <main className='main'>
        {window.innerWidth < '600' && <SearchBar />}
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
  } else if (props.componentState === 'PROFILE') {
    return (
      <main className='main'>
        {window.innerWidth < '600' && <SearchBar />}
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
  } else if (props.componentState === 'MESSAGES') {
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
  } else if (props.componentState === 'SETTINGS') {
    return (
      <main className='main settings'>
        <Settings logoutHandler={props.logoutHandler}/>
      </main>
    );
  }
  //  else if (props.componentState === 'NOTIFICATIONS') {
  //   return <Notification title='Notification Page' />;
  // }
}
export default Main;
