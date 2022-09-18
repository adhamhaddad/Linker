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
    props.changeComponent(e.target.title);
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
          title='Notifications'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-bell notifi' title='Notifications'>
            <span title='Notifications'>13</span>
          </i>
          <span title='Notifications'>notifications</span>
        </a>
      </li>
      <li className='settings'>
        <a
          href='/settings'
          title='Settings'
          onClick={navClickHandler}
        >
          <i className='fa-solid fa-cog' title='Settings'></i>
          <span title='Settings'>settings</span>
        </a>
      </li>
    </ul>
  );
}
export default MenuList;
