import React, { Component } from 'react';
import './Notification.css';

class Notifications extends Component {
  state = {
    user: [
      {
        id: 1,
        img: '',
        fname: 'mariam',
        time: 100,
        content: `has liked on your post`,
      },
      {
        id: 2,
        img: '',
        fname: 'simba',
        time: 200,
        content: `has liked on your post`,
      },
      {
        id: 3,
        img: '',
        fname: 'bassem',
        time: 200,
        content: `has commented on your post`,
      },
      {
        id: 4,
        img: '',
        fname: 'adham',
        time: 200,
        content: `shared your post`,
      },
      {
        id: 5,
        img: '',
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
