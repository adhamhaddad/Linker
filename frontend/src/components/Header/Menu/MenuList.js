import React from 'react';
import './MenuList.css';

function MenuList(props) {
  const navClickHandler = (e) => {
    e.preventDefault();
    // if (e.target.tagName == 'SPAN' || e.target.tagName == 'I') {
    //   e.target.parentElement.classList.add('active');
    // } else {
    //   e.target.classList.add('active');
    // }
    props.changeComponents(e.target.title);
  };
  return (
    <ul className='menu-list'>
      <li>
        <a href='/home' title='Home' rel='noreferrer' onClick={navClickHandler}>
          <i className='fa-solid fa-home' title='Home'></i>
          <span title='Home'>home</span>
        </a>
      </li>

      <li>
        <a
          href='/profile'
          title='Profile'
          rel='noreferrer'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-user-circle' title='Profile'></i>
          <span title='Profile'>profile</span>
        </a>
      </li>

      <li className='.msg'>
        <a
          href='/messages'
          title='Messages'
          rel='noreferrer'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-comments msg' title='Messages'>
            {<span>4</span>}
          </i>
          <span title='Messages'>messages</span>
        </a>
      </li>
      <li className='notifications'>
        <a
          href='/notification'
          title='Notification'
          rel='noreferrer'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-bell notifi' title='Notification'>
            <span title='Notification'>13</span>
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
        <a
          href='/settings'
          title='Settings'
          rel='noreferrer'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-cog' title='Settings'></i>
          <span title='Settings'>settings</span>
        </a>
        <ul>
          <li>
            <a
              href='/about'
              title='About'
              rel='noreferrer'
              onClick={navClickHandler}
            >
              <i className='fa-solid fa-question' title='About'></i>
              <span title='About'>about</span>
            </a>
          </li>
          <li>
            <a
              href='/contact'
              title='Contact Us'
              rel='noreferrer'
              onClick={navClickHandler}
            >
              <i className='fa-solid fa-phone' title='Contact Us'></i>
              <span title='Contact Us'>contact us</span>
            </a>
          </li>
          <li>
            <a
              href='/privacy'
              title='Privacy'
              rel='noreferrer'
              onClick={navClickHandler}
            >
              <i className='fa-solid fa-lock' title='Privacy'></i>
              <span title='Privacy'>privacy</span>
            </a>
          </li>
          <li>
            <a
              href='/login'
              title='Log Out'
              rel='noreferrer'
              onClick={() => {props.logoutHandler(); navClickHandler()}}
            >
              <i className='fa-solid fa-sign-out' title='Log Out'></i>
              <span title='Log Out'>log out</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
}
export default MenuList;
