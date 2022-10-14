import React, { useState, useEffect } from 'react';
import useHttp from '../../../hooks/use-http';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../../components/Searchbar';
import SpinnerLoading from '../../../components/Loading/Spinner';
import Error from '../../../components/Error';
import classes from './ChatUsers.module.css';

const ChatUsers = ({ user_id, windowSize }) => {
  const [friendsList, setFriendsList] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  const list =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.user_id}>
        <NavLink
          to={
            windowSize <= 600
              ? `/messages/${friend.username}/phone-screen?user_id=${friend.user_id}`
              : `/messages/${friend.username}?user_id=${friend.user_id}`
          }
          className={classes['user-card']}
          activeClassName={classes.active}
        >
          <div className={classes.profile} alt={friend.username}></div>
          <div className={classes['content']}>
            <span className={classes.username}>
              {friend.fname} {friend.lname}
            </span>
            <p className={classes.message}>Call me later</p>
          </div>
          <div className={classes.time}>19 m</div>
        </NavLink>
      </li>
    ));

  useEffect(() => {
    sendRequest(`user/friends?user_id=${user_id}`, 'GET', {}, setFriendsList);
  }, []);
  return (
    <div className={classes['chat-users']}>
      <SearchBar />
      {isLoading && <SpinnerLoading color='light' />}
      {isError !== null && <Error message={isError} />}
      {list.length === 0 && <p>Friends is {list.length}</p>}
      {list.length > 0 && <ul className={classes['users-list']}>{list}</ul>}
    </div>
  );
};
export default ChatUsers;
