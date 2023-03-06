import React from 'react';
import { Link } from 'react-router-dom';
import PostDate from '../utils/date-utils';
import classes from '../css/NotificationCard.module.css';

const NotificationCard = ({
  username,
  fname,
  lname,
  profile,
  content,
  time
}) => {
  const onDeleteNotification = () => {};
  return (
    <li>
      <Link to='/' className={classes['notification-card']}>
        <Link
          to={`/profile/${username}`}
          className={classes['notification-profile']}
        >
          <img src='#' alt='Profile Picture' />
        </Link>
        <span className={classes['notification-username']}>
          {fname} {lname}
        </span>
        <div className={classes['notification-content']}>{content}</div>
        <div className={classes['notification-controller']}>
          <button
            onClick={onDeleteNotification}
            className={classes['notification-delete']}
          ></button>
          <PostDate time={time} />
        </div>
      </Link>
    </li>
  );
};
export default NotificationCard;
