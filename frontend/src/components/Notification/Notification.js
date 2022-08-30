import React, { Component } from 'react';
import './Notification.css';
import mrym from '../../Images/mrym.png';
import profile from '../../Images/profile.jpg';
import beso from '../../Images/beso1.jpg';
import simba from '../../Images/simba.jpg';
import bassem from '../../Images/bassem.jpg';

class Notifications extends Component {
  state = {
    user: [
      {
        id: 1,
        img: mrym,
        fname: 'mariam',
        time: 100,
        content: `has liked on your post`,
      },
      {
        id: 2,
        img: simba,
        fname: 'simba',
        time: 200,
        content: `has liked on your post`,
      },
      {
        id: 3,
        img: bassem,
        fname: 'bassem',
        time: 200,
        content: `has commented on your post`,
      },
      {
        id: 4,
        img: profile,
        fname: 'adham',
        time: 200,
        content: `shared your post`,
      },
      {
        id: 5,
        img: beso,
        fname: 'ahmed',
        time: 500,
        content: `shared your post`,
      },
    ],
  };

  notificationTime = (time) => {
    const result = time > 60 ? `${String(time).charAt(0)}h` : `${time}m`;
    return result;
  };
  render() {
    const notificationList = this.state.user.map((e) => {
      return (
        <li key={e.id}>
          <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
            <img src={e.img} alt='Profile' className='image' />
            <p className='content'>
              {e.fname} {e.content}
            </p>
            <span className='time'>{this.notificationTime(e.time)}</span>
          </a>
        </li>
      );
    });
    return (
      <div className='container'>
        <ul>{notificationList}</ul>
      </div>
    );
  }
}
export default Notifications;
