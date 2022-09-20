import React, { useState } from 'react';
import classes from './MessageCard.module.css';

function MessageCard(props) {
  const [messageStatus, setMessageStatus] = useState('seen');
  const format = (time) => {
    const timeFormat = new Date(time).toLocaleString('en-US', {
      timeStyle: 'short'
    });
    return timeFormat;
  };

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

  return (
    <div
      className={`${classes['message-container']} ${classes[props.className]}`}
    >
      <img src={props.profile} alt='Profile' className={classes.profile} />
      <div className={classes['message-info']}>
        <span className={classes['message-content']}>{props.message}</span>
        <span className={classes['message-time']}>{format(props.time)}</span>
      </div>
      <span className={classes['message-status']}>
        <img
          src='./images/mrym.png'
          alt=''
          className={messageStatus ? 'active' : 'sent'}
        />
      </span>
    </div>
  );
}
export default MessageCard;
