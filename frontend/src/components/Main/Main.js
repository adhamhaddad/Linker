import React from 'react';
import Logo from '../Header/Logo/Logo';
import SearchBar from '../Header/Search/Searchbar';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Messages from '../Messages/Messages';
import Notification from '../Notification/Notification';
import Settings from '../Settings/Settings';
import TopNavbar from '../Header/TopNavbar/TopNavbar';
import Information from '../Settings/Information/Information';
import classes from './Main.module.css';

function Main(props) {
  if (localStorage.getItem('currentComponent') === 'HOME') {
    return (
      <main className={classes.main}>
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
      <main className={classes.main}>
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
      <main className={`${classes.main} ${classes['main-chat']}`}>
        <Messages
          title='Messages-Page'
          user={props.user}
          photos={props.photos}
          receiver={props.receiverUser}
          sender={props.senderUser}
          addNewMessageHandler={props.addNewMessageHandler}
        />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'NOTIFICATIONS') {
    return (
      <main className={`${classes.main} ${classes['main-notification']}`}>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <Logo />
            <SearchBar />
          </TopNavbar>
        )}
        <Notification
          title='Notification Page'
          notificationsList={props.notificationsList}
        />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'SETTINGS') {
    return (
      <main className={`${classes.main} ${classes['main-settings']}`}>
        <Settings changeComponent={props.changeComponent} />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'INFORMATION') {
    return (
      <main className={classes.main}>
        {window.innerWidth <= '600' && (
          <TopNavbar>
            <button
              style={{
                color: '#FFF',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginRight: '5px',
                backgroundColor: 'var(--base-color-dark)'
              }}
            >
              <i className='fa-solid fa-circle-chevron-left'></i>
            </button>
            <p
              style={{
                color: '#FFF'
              }}
            >
              Settings
            </p>
          </TopNavbar>
        )}
        <Information />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'PRIVACY') {
    return (
      <main className={classes.main}>
        <Information />
      </main>
    );
  } else if (localStorage.getItem('currentComponent') === 'ACCOUNT') {
    return (
      <main className={classes.main}>
        <Information />
      </main>
    );
  } else {
    return (
      <main className={classes.main}>
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
