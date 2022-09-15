import React from 'react';
import './MenuList.css';

function MenuList() {
  return (
      <ul className='menu-list'>
        <li>
          <a href='/home' title='Home' rel='noreferrer'>
            <i className='fa-solid fa-home'></i>
            <span>home</span>
          </a>
        </li>

        <li>
          <a href='/profile' title='Profile' rel='noreferrer'>
            <i className='fa-solid fa-user-circle'></i>
            <span>profile</span>
          </a>
        </li>

        <li className='.msg'>
          <a href='/messages' title='Messages' rel='noreferrer'>
            <i className='fa-solid fa-comments msg'>
              {<span>4</span>}
            </i>
            <span>messages</span>
          </a>
        </li>
        <li className='notifications'>
          <a href='/notification' title='Notification' rel='noreferrer'>
            <i className='fa-solid fa-bell notifi'>
              <span>13</span>
            </i>
            <span>notifications</span>
            <div className='all-notifications'>
              <iframe
                src=''
                title='Notification'
                frameBorder='0'
                className='notifications-iframe'
              ></iframe>
            </div>
          </a>
        </li>
        <li className='settings'>
          <a href='/settings' title='Settings' rel='noreferrer'>
            <i className='fa-solid fa-cog'></i>
            <span>settings</span>
          </a>
          <ul>
            <li>
              <a href='/about' title='About' rel='noreferrer'>
                <i className='fa-solid fa-question'></i>
                <span>about</span>
              </a>
            </li>
            <li>
              <a href='/contact' title='Contact Us' rel='noreferrer'>
                <i className='fa-solid fa-phone'></i>
                <span>contact us</span>
              </a>
            </li>
            <li>
              <a href='/privacy' title='Privacy' rel='noreferrer'>
                <i className='fa-solid fa-lock'></i>
                <span>privacy</span>
              </a>
            </li>
            <li>
              <a href='/login' title='Log Out' rel='noreferrer'>
                <i className='fa-solid fa-sign-out'></i>
                <span>log out</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
  );
}
export default MenuList;
