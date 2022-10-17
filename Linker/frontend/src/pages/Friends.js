import React, { useEffect, useState, useContext } from 'react';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import classes from '../css/Friends.module.css';

const Friends = (user_id) => {
  const authCtx = useContext(AuthenticateContext);
  const [listSize, setListSize] = useState(false);
  const { isLoading, isError, sendRequest } = useHttp();
  const [friendsList, setFriendsList] = useState([]);
  
  const onDeleteFriend = (e) => {
    console.log(e);
    sendRequest('/user/friend', 'DELETE', { user_id, friend_id: 1 }, null);
  };
  
  const List =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.user_id}>
        <Link
          to={`/profile/${friend.username}`}
          className={
            listSize ? classes.max : `${classes.profile} ${classes.min}`
          }
        >
          <div className={classes.profile}></div>
          <div className={classes.username}>
            {friend.fname} {friend.lname}
          </div>
          <button onClick={onDeleteFriend} className={classes.delete}></button>
        </Link>
      </li>
    ));
  const showFriendsHandler = () => {
    setListSize((prev) => !prev);
  };
  useEffect(() => {
    sendRequest(
      `user/friends?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setFriendsList
    );
  }, []);

  return (
    <>
      <section className={classes.friends}>
        <h3>
          friends {friendsList.length}
          {friendsList.length > 0 && (
            <button
              className={classes['show-all']}
              onClick={showFriendsHandler}
            >
              {listSize ? 'hide' : 'show'}
            </button>
          )}
        </h3>
        {isLoading && <SpinnerLoading color='light' />}
        {isError !== null && <Error message={isError} />}
        {friendsList.length > 0 && (
          <ul
            className={`${classes['friends-list']} ${
              listSize ? classes.max : classes.min
            }`}
          >
            {List}
          </ul>
        )}
      </section>
    </>
  );
};
export default Friends;
