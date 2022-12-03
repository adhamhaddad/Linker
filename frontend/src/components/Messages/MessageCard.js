import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../css/MessageCard.module.css';
import apiUrlContext from '../../utils/api-urls';

const MessageCard = ({
  profile,
  username,
  message,
  timedate,
  lang,
  className,
  message_id,
  updateMessage,
  deleteMessage
}) => {
  const [messageStatus, setMessageStatus] = useState('seen');
  const [control, setControl] = useState(false);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const apiCtx = useContext(apiUrlContext);
  const format = (time) =>
    new Date(time).toLocaleString('en-US', { timeStyle: 'short' });

  // if (messageStatus == 'seen') {
  //   return <img src='./images/mrym.png' alt="" className={messageStatus ? 'active' : 'sent'}/>
  // } else if (messageStatus == 'sent') {
  //   return <i className='fa-solid fa-circle-check'></i>
  // } else if (messageStatus == 'delivered') {
  //   return <i className='fa-regular fa-circle-check'></i>
  // } else if (messageStatus == 'sending') {
  //   return <i className='fa-regular fa-circle'></i>
  // } else {
  //   return <i className='fa-regular fa-error'></i>
  // }
  const toggleControl = () => {
    setControl((prev) => !prev);
  };
  const editMessage = () => {
    setIsEditMessage((prev) => !prev);
  };
  const onEditMessage = (e) => {
    setEditedMessage(e.target.value);
  };
  return (
    <div
      className={`${classes['message-container']} ${classes[className]}`}
      id={message_id}
      onMouseLeave={() => setControl(false)}
    >
      <Link to={`/profile/${username}`} className={classes['message-profile']}>
        {profile !== null && (
          <img
            crossOrigin='anonymous'
            src={`${apiCtx.url}/${profile}`}
            alt={username}
          />
        )}
      </Link>
      <div className={classes['message-info']}>
        <span className={classes['message-content']} lang={lang}>
          {!isEditMessage && message}
          {isEditMessage && (
            <>
              <textarea
                autoFocus
                value={editedMessage}
                // onBlur={editMessage}
                onChange={onEditMessage}
              >
                {message}
              </textarea>
              <button
                onClick={() =>
                  updateMessage({
                    message_id: message_id,
                    content: editedMessage
                  })
                }
              >
                save
              </button>
            </>
          )}
        </span>
        <span className={classes['message-time']}>{format(timedate)}</span>
      </div>
      {/* <div className={classes['message-status']}></div> */}
      <div className={classes['message-control']}>
        <button onClick={toggleControl} className={classes['control-button']}>
          <i className='fa-solid fa-ellipsis'></i>
        </button>
        {control && (
          <ul>
            <li>
              <button onClick={editMessage}>
                <i className='fa-solid fa-edit'></i>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  deleteMessage(message_id);
                }}
              >
                <i className='fa-solid fa-trash'></i>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default MessageCard;
