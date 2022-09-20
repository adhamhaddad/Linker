import React from 'react';
import classes from './MenuList.module.css';

function MenuList(props) {
  const navClickHandler = (e) => {
    e.preventDefault();
    props.changeComponent(e.target.title);
  };

  return (
    <ul className={classes['menu-list']}>
      <li>
        <a id='HOME' title='Home' onClick={navClickHandler}>
          <i className='fa-solid fa-home' title='Home'></i>
          <span title='Home'>home</span>
        </a>
      </li>

      <li>
        <a title='Profile' onClick={navClickHandler}>
          <i className='fa-solid fa-user-circle' title='Profile'></i>
          <span title='Profile'>profile</span>
        </a>
      </li>

      <li>
        <a title='Messages' onClick={navClickHandler}>
          <i className='fa-solid fa-comments' title='Messages'>
            {/* <span title='Messages'>4</span> */}
          </i>
          <span title='Messages'>messages</span>
        </a>
      </li>

      <li>
        <a
          title='Notifications'
          className={classes.notifications}
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-bell' title='Notifications'>
            {/* <span title='Notifications'>13</span> */}
          </i>
          <span title='Notifications'>notifications</span>
        </a>
      </li>

      <li>
        <a title='Settings' onClick={navClickHandler}>
          <i className='fa-solid fa-cog' title='Settings'></i>
          <span title='Settings'>settings</span>
        </a>
      </li>
    </ul>
  );
}
export default MenuList;
