import React from 'react';
import { Link } from 'react-router-dom';
import NotificationDate from '../Validation/NotificationDate';
import classes from '../css/NotificationCard.module.css';

function NotificationCard({ username, fname, lname, profile, content, time }) {
  const onDeleteNotification = () => {};
  return (
    <li>
      <Link to='/' className={classes['notification-card']}>
        <div
          to={`/profile/${username}`}
          className={classes['notification-profile']}
        >
          {fname} {lname}
        </div>
        <div className={classes['notification-content']}>{content}</div>
        <div className={classes['notification-controller']}>
          <button
            onClick={onDeleteNotification}
            className={classes['notification-delete']}
          ></button>
          <NotificationDate time={time} />
        </div>
      </Link>
    </li>
  );
}
export default NotificationCard;
