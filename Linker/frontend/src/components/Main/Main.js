import React from 'react';
import { Route } from 'react-router-dom';
import Logo from '../Header/Logo/Logo';
import SearchBar from '../Header/Search/Searchbar';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Messages from '../../pages/Messages/Messages';
import Notification from '../../pages/Notification/Notification';
import Settings from '../../pages/Settings/Settings';
import TopNavbar from '../Header/TopNavbar/TopNavbar';
import Information from '../../pages/Settings/Information/Information';
import Loading from '../Loading/Loading';
import Account from '../../pages/Settings/Account/Account';
import classes from './Main.module.css';

function Main(props) {
  return (
    <>
      {props.isLoading && <Loading />}
      {window.innerWidth <= '600' && (
        <TopNavbar>
          <Logo />
          <SearchBar />
        </TopNavbar>
      )}
      <main className={classes.main}>
        <Route path='/home'>
          <Home reactions={props.reactions} setReactions={props.setReactions} />
        </Route>
        <Route path='/profile'>
          <Profile
            title='Profile-Page'
            user={props.user}
            reactions={props.reactions}
            setReactions={props.setReactions}
            addNewPost={props.addNewPost}
          />
        </Route>
        <Route path='/messages'>
          <Messages
            title='Messages-Page'
            user={props.user}
            photos={props.photos}
            receiver={props.receiverUser}
            sender={props.senderUser}
            addNewMessageHandler={props.addNewMessageHandler}
          />
        </Route>
        <Route path='/notifications'>
          <Notification
            title='Notification Page'
            notificationsList={props.notificationsList}
          />
        </Route>
        <Route path='/settings'>
          <Settings changeComponent={props.changeComponent} />
        </Route>
        <Route path='/information'>
          <Information />
        </Route>
        <Route path='/privacy'>
          <Information />
        </Route>
        <Route path='/emails'>
          <Information />
        </Route>
        <Route path='/language'>
          <Information />
        </Route>
        <Route path='/account'>
          <Account />
        </Route>
        <Route path='/help'>
          <Information />
        </Route>
      </main>
    </>
  );
  // <main className={`${classes.main} ${classes['main-chat']}`}>
  // <main className={`${classes.main} ${classes['main-notification']}`}>
  // <main className={`${classes.main} ${classes['main-settings']}`}>
}
export default Main;
