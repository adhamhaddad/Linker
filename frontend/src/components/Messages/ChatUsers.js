import React, { useState, useEffect, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import SpinnerLoading from '../Loading/Spinner';
import Error from '../Error';
import ChatUsersCard from './ChatUsersCard';
import classes from '../../css/ChatUsers.module.css';

const ChatUsers = ({ windowSize, socket }) => {
  const authCtx = useContext(AuthenticateContext);
  const [friendsList, setFriendsList] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  const list =
    friendsList.length > 0 &&
    friendsList.map((friend) => {
      return (
        <ChatUsersCard
          key={friend.friend_id}
          user_id={friend.user_id}
          username={friend.username}
          first_name={friend.first_name}
          last_name={friend.last_name}
          profile_picture={friend.profile_picture}
          windowSize={windowSize}
          socket={socket}
        />
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
      {isLoading && <SpinnerLoading color='light' />}
      {isError !== null && <Error message={isError} />}
      {list.length === 0 && <p>Friends is {list.length}</p>}
      {list.length > 0 && <ul className={classes['users-list']}>{list}</ul>}
    </div>
  );
};
export default ChatUsers;
