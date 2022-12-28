import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import useHttp from '../../hooks/use-http';
import classes from '../../css/ChatUsersCard.module.css';

const ChatUsersCard = ({
  user_id,
  username,
  first_name,
  last_name,
  profile_picture,
  windowSize,
  socket
}) => {
  const [message, setMessage] = useState({});
  const authCtx = useContext(AuthenticateContext);
  const apiCtx = useContext(apiUrlContext);
  const { sendRequest } = useHttp();

  const newMessageAdded = (data) => {
    setMessage(data);
  };

  const newMessageDeleted = (data) => {
    // setMessage(prev => )
  };
  useEffect(() => {
    sendRequest(
      `user/all-messages?sender_id=${authCtx.user.user_id}&receiver_id=${user_id}`,
      'GET',
      {},
      setMessage
    );

    socket.on('messages', (data) => {
      if (data.action === 'NEW_MESSAGE') {
        if (
          (data.data.receiver_username === authCtx.user.username &&
            data.data.sender_username === username) ||
          (data.data.receiver_username === username &&
            data.data.sender_username === authCtx.user.username)
        ) {
          newMessageAdded(data.data);
        }
      }
      if (data.action === 'DELETE_MESSAGE') {
        if (
          (data.data.receiver_username === authCtx.user.username &&
            data.data.sender_username === username) ||
          (data.data.receiver_username === username &&
            data.data.sender_username === authCtx.user.username)
        ) {
          newMessageAdded(data.data);
        }
      }
    });
  }, []);

  return (
    <li key={user_id} className={classes['card']}>
      <NavLink
        to={
          windowSize <= 600
            ? `/messages/${username}/phone-screen`
            : `/messages/${username}`
        }
        className={classes['user-card']}
        activeClassName={classes['active']}
      >
        <div className={classes['profile-picture']}>
          {profile_picture !== null && (
            <img
              crossOrigin='anonymous'
              src={`${apiCtx.url}/${profile_picture}`}
              alt={username}
            />
          )}
        </div>
        <div className={classes['content']}>
          <span className={classes['username']}>
            {first_name} {last_name}
          </span>
          <p className={classes['message']}>
            {message !== undefined &&
              message.content !== undefined &&
              message.content !== null && (
                <>
                  {message.sender_id === authCtx.user.user_id ||
                    (message.receiver_id === authCtx.user.user_id &&
                      message.content)}

                  {message.sender_id !== authCtx.user.user_id ||
                    (message.receiver_id !== authCtx.user.user_id && (
                      <>You: {message.content}</>
                    ))}
                </>
              )}

            {message == null && (
              <>
                You and{' '}
                <span className={classes['first_name']}>{first_name}</span> are
                now friends.
              </>
            )}
          </p>
        </div>
        {message !== undefined &&
          message.timedate !== undefined &&
          message.timedate !== null && (
            <div className={classes['time']}>
              {new Date(message.timedate).toLocaleString('en-US', {
                timeStyle: 'short'
              })}
            </div>
          )}
      </NavLink>
    </li>
  );
};
export default ChatUsersCard;
