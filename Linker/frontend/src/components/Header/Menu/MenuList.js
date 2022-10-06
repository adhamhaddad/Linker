import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MenuList.module.css';

function MenuList() {
  return (
    <ul className={classes['menu-list']}>
      <li>
        <NavLink title='Home' activeClassName={classes.active} to='/home'>
          <i className='fa-solid fa-home'></i>
          <span>home</span>
        </NavLink>
      </li>

      <li>
        <NavLink to='/profile' activeClassName={classes.active} title='Profile'>
          <i className='fa-solid fa-user-circle'></i>
          <span>profile</span>
        </NavLink>
      </li>

      <li>
        <NavLink to='/messages' activeClassName={classes.active} title='Messages'>
          <i className='fa-solid fa-comments'>
            {/* <span title='Messages'>4</span> */}
          </i>
          <span title='Messages'>messages</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          title='Notifications'
          activeClassName={classes.active}
          to='/notifications'
        >
          <i className='fa-solid fa-bell'>
            {/* <span title='Notifications'>13</span> */}
          </i>
          <span>notifications</span>
        </NavLink>
      </li>

      <li>
        <NavLink title='Settings' activeClassName={classes.active} to='/settings'>
          <i className='fa-solid fa-cog'></i>
          <span>settings</span>
        </NavLink>
      </li>
    </ul>
  );
}
export default MenuList;
