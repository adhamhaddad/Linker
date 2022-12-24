import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../UI/BackButton';
import classes from '../../css/ChatHeader.module.css';

const ChatHeader = ({ username, first_name, last_name }) => {
  const [menuState, setMenuState] = useState(false);
  const toggleMenu = () => {
    setMenuState((prev) => !prev);
  };
  return (
    <div className={classes['chat-header']}>
      <BackButton path='/messages' />

      <span className={classes.username}>
        <Link to={`/profile/${username}`}>
          {first_name} {last_name}
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
              <i className='fa-regular fa-bell-slash'></i>
              <span>mute</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-comment-slash'></i>
              <span>close conversation</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-regular fa-trash-can'></i>
              <span>delete conversation</span>
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
};
export default ChatHeader;
