import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../UI/BackButton';
import classes from '../../css/ChatHeader.module.css';

function ChatHeader({receiver_id, username, fname, lname }) {
  const [menuState, setMenuState] = useState(false);
  const toggleMenu = () => {
    setMenuState((prev) => !prev);
  };
  return (
    <div className={classes['chat-header']}>
      <BackButton path='/messages' />

      <span className={classes.username}>
        <Link to={`/profile/${username}?user_id=${receiver_id}`}>
          {fname} {lname}
        </Link>
      </span>
      <span className={classes.status}></span>

      <button onClick={toggleMenu}>
        <i
          className={
            menuState ? 'fa-solid fa-ellipsis' : 'fa-solid fa-ellipsis-vertical'
          }
        ></i>
      </button>
      {menuState && (
        <ul className={classes.menu}>
          <li>
            <a href='#'>
              <i className='fa-solid fa-phone'></i>
              <span>call</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-bell-slash'></i>
              <span>mute</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-rectangle-xmark'></i>
              <span>close</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-circle-exclamation'></i>
              <span>report</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
export default ChatHeader;
