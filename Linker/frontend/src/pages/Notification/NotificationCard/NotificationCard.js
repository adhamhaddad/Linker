import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationDate from '../NotificationDate/NotificationDate';

import classes from './NotificationCard.module.css';

function NotificationCard(props) {
  const [sliders, setSliders] = useState(false);

  const slidersHandler = () => {
    setSliders((prev) => !prev);
  };
  return (
    <li className={classes['notification-card']}>
      <Link
        to={`/profile/${props.profile}`}
        className={classes['notification-profile']}
      >
        {props.content}
      </Link>

      <div className={classes['notification-content']}>
        <a>{props.username}</a>
      </div>

      <div className={classes['notification-controller']}>
        <button onClick={slidersHandler}></button>
        <NotificationDate time={props.time} />
      </div>
    </li>
  );
}
export default NotificationCard;
