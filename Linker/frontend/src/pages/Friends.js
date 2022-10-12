import React, { useEffect, useState, useContext } from 'react';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import classes from '../css/Friends.module.css';

const Friends = () => {
  const authCtx = useContext(AuthenticateContext);
  const [listSize, setListSize] = useState('min');
  const { isLoading, isError, sendRequest } = useHttp();
  const [friendsList, setFriendsList] = useState([]);
  const onDeleteFriend = (e) => {
    console.log(e);
  };
  const List =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.user_id}>
        <Link
          to={`/profile/${friend.username}`}
          className={
            listSize === 'min' ? `${classes.min} ${classes.profile}` : null
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

  useEffect(() => {
    sendRequest(
      `user/friends?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setFriendsList
    );
  }, []);

  return (
    <section className={classes.friends}>
      <h3>Friends {friendsList.length}</h3>
      {isLoading && <SpinnerLoading color='light' />}
      {isError !== null && <Error message={isError} />}
      {friendsList.length > 0 && (
        <ul
          className={`${classes['friends-list']} ${
            listSize === 'min' ? classes.min : null
          }`}
        >
          {List}
        </ul>
      )}
    </section>
  );
};
export default Friends;
