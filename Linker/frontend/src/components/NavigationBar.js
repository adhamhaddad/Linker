import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../css/NavigationBar.module.css';

const NavigationBar = ({ username, profile, windowSize }) => {
  return (
    <ul className={classes.navigation}>
      <li>
        <NavLink
          to='/home'
          // className={classes['new']}
          activeClassName={classes.active}
          title='Home'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            data-supported-dps='24x24'
            width='24'
            height='24'
            focusable='false'
          >
            <path d='M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z'></path>
          </svg>
          <span>home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/profile/${username}`}
          activeClassName={classes.active}
          title='Profile'
        >
          <div className={classes['profile-picture']}>
            {profile !== null && profile !== 'null' && (
              <img
                crossOrigin='anonymous'
                src={`http://192.168.1.6:4000/${profile}`}
              />
            )}
          </div>
          <span>profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={windowSize <= 600 ? '/requests/phone-screen' : '/requests'}
          activeClassName={classes.active}
          title='Friend-Request'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            data-supported-dps='24x24'
            width='24'
            height='24'
            focusable='false'
          >
            <path d='M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z'></path>
          </svg>
          <span>requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/messages'
          activeClassName={classes.active}
          title='Messages'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            data-supported-dps='24x24'
            width='24'
            height='24'
            focusable='false'
          >
            <path d='M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z'></path>
          </svg>
          <span>messages</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          title='Notifications'
          activeClassName={classes.active}
          to='/notifications'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            data-supported-dps='24x24'
            width='24'
            height='24'
            focusable='false'
          >
            <path d='M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z'></path>
          </svg>
          <span>notifications</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          title='Settings'
          activeClassName={classes.active}
          to='/settings'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-50 -45 600 500'
            data-supported-dps='24x24'
            width='24'
            height='24'
            focusable='false'
          >
            <path d='M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z' />
          </svg>
          <span>settings</span>
        </NavLink>
      </li>
    </ul>
  );
};
export default NavigationBar;
