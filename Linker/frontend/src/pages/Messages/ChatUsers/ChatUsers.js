import React, { useState, useEffect } from 'react';
import useHttp from '../../../hooks/use-http';
import { Link } from 'react-router-dom';
import SearchBar from '../../../components/Searchbar';
import classes from './ChatUsers.module.css';

const ChatUsers = ({ user_id, friends }) => {
  const [friendsList, setFriendsList] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  console.log(friendsList);

  const list =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.id}>
        <Link to={`/${friend.username}`} className={classes['user-card']}>
          <div className={classes.profile} alt={friend.username}></div>
          <div className={classes['content']}>
            <span className={classes.username}>
              {friend.fname} {friend.lname}
            </span>
            <p className={classes.message}>Call me later</p>
          </div>
          <div className={classes.time}>19 m</div>
        </Link>
      </li>
    ));

  // useEffect(() => {
  //   sendRequest(`user/friends?user_id=${user_id}`, 'GET', {}, setFriendsList);
  // }, []);
  return (
    <div className={classes['chat-users']}>
      <SearchBar />
      {list.length > 0 && <ul className={classes['users-list']}>{list}</ul>}
    </div>
  );
};
export default ChatUsers;
