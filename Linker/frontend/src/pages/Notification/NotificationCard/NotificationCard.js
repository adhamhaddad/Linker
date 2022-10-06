import React, { useState } from 'react';
import NotificationDate from '../NotificationDate/NotificationDate';
import classes from './NotificationCard.module.css';

function NotificationCard(props) {
  const [sliders, setSliders] = useState(false);

  const slidersHandler = () => {
    setSliders((prev) => {
      return prev ? false : true;
    });
  };
  return (
    <li className={classes['notification-card']}>
      <div className={classes['notification-profile']}>
        <a href='#' target='_blank' rel='noreferrer'>
          <img src={props.profile} alt='Profile' />
        </a>
      </div>

      <div className={classes['notification-content']}>
        <a>{props.username}</a> {props.content}
      </div>

      <div className={classes['notification-controller']}>
        <button onClick={slidersHandler}>
          <i
            className={
              sliders ? 'fa-solid fa-xmark' : 'fa-solid fa-sliders'
            }
          ></i>
        </button>
        <NotificationDate time={props.time} />
      </div>
    </li>
  );
}
export default NotificationCard;
