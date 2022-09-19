import React from 'react';
import classes from './MessageCard.module.css';

function MessageCard(props) {
  const format = (time) => {
    const timeFormat = new Date(time).toLocaleString('en-US', {timeStyle: 'short'});
    return timeFormat;
  };

  return (
    <div
      className={`${classes['message-container']} ${classes[props.className]}`}
    >
      <img src={props.profile} alt='Profile' />
      <div className={classes['message-info']}>
        <span className={classes['message-content']}>{props.message}</span>
        <span className={classes['message-time']}>
          {format(props.time)}
        </span>
      </div>
    </div>
  );
}
export default MessageCard;
