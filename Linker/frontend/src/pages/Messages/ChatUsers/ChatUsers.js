import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ChatUsers.module.css';

const ChatUsers = (props) => {
  return (
    <div className={classes['chat-users']}>
      <ul className={classes['users-list']}>
        <li>
          <Link to={`/${props.username}`} className={classes['user-card']}>
            <img
              src='./images/beso.jpg'
              className={classes.profile}
              alt={props.username}
            />
            <div className={classes['content']}>
              <span className={classes.username}>
                {props.fname} {props.lname}
              </span>
              <p className={classes.message}>Call me later</p>
            </div>
            <div className={classes.time}>19 m</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default ChatUsers;
