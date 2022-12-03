import React, { useState, useEffect, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import { NavLink } from 'react-router-dom';
import SearchBar from '../Searchbar';
import SpinnerLoading from '../Loading/Spinner';
import Error from '../Error';
import classes from '../../css/ChatUsers.module.css';
import apiUrlContext from '../../utils/api-urls';

const ChatUsers = ({ windowSize, socket }) => {
  const authCtx = useContext(AuthenticateContext);
  const apiCtx = useContext(apiUrlContext);
  const [friendsList, setFriendsList] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  const list =
    friendsList.length > 0 &&
    friendsList.map((friend) => {
      return (
        <li key={friend.user_id}>
          <NavLink
            to={
              windowSize <= 600
                ? `/messages/${friend.username}/phone-screen`
                : `/messages/${friend.username}`
            }
            className={classes['user-card']}
            activeClassName={classes.active}
          >
            <div className={classes['profile-picture']}>
              {friend.profile_picture !== null && (
                <img
                  crossOrigin='anonymous'
                  src={`${apiCtx.url}/${friend.profile_picture}`}
                  alt={friend.username}
                />
              )}
            </div>
            <div className={classes['content']}>
              <span className={classes.username}>
                {friend.first_name} {friend.last_name}
              </span>
              <p className={classes.message}>Call me later</p>
            </div>
            <div className={classes.time}>19 m</div>
          </NavLink>
        </li>
      );
    });

  useEffect(() => {
    sendRequest(
      `user/friends?username=${authCtx.user.username}`,
      'GET',
      {},
      setFriendsList
    );
  }, []);

  return (
    <div className={classes['chat-users']}>
      <SearchBar theme='chat-search' />
      {isLoading && <SpinnerLoading color='light' />}
      {isError !== null && <Error message={isError} />}
      {list.length === 0 && <p>Friends is {list.length}</p>}
      {list.length > 0 && <ul className={classes['users-list']}>{list}</ul>}
    </div>
  );
};
export default ChatUsers;
