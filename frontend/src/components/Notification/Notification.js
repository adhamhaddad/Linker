import React, { useState } from 'react';
import NotificationDate from '../Post/Validation/NotificationDate';
import './Notification.css';

function Notifications() {
  const [sliders, setSliders] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      username: 'Mariam Maged',
      profile: './images/mrym.png',
      time: 'Tue Sep 13 2022 17:40:31 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 2,
      username: 'Mohamed Khaled',
      profile: './images/simba.jpeg',
      time: 'Tue Sep 13 2022 17:35:31 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 3,
      username: 'Bassem Hamada',
      profile: './images/bassem.jpg',
      time: 'Fri Sep 10 2022 12:30:31 GMT+0200 (Eastern European Standard Time)',
      content:
        'has commented on your post'
    },
    {
      id: 4,
      username: 'Ahmed Emad',
      profile: './images/beso.jpg',
      time: 'Fri Sep 10 2022 14:12:31 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    },
    {
      id: 5,
      username: 'Cup Coffee',
      profile: './images/coffee.jpg',
      time: 'Sun Sep 11 2022 13:12:31 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    }
  ]);

  const slidersHandler = () => {
    setSliders((prev) => {
      return prev ? false : true;
    });
  };

  const notificationTime = (time) => {
    const result = time > 60 ? `${String(time).charAt(0)}h` : `${time}m`;
    return result;
  };

  const notificationList = notificationsList.map((notification) => {
    return (
      <li key={notification.id} className='notification-card'>
        <div className='notification-profile'>
          <a href='#' target='_blank' rel='noreferrer'>
            <img src={notification.profile} alt='Profile' />
          </a>
        </div>

        <div className='notification-content'>
          <a>{notification.username}</a> {notification.content}
        </div>

        <div className='notification-controller'>
          <button onClick={slidersHandler}>
            <i
              className={sliders ? 'fa-solid fa-xmark' : 'fa-solid fa-sliders'}
            ></i>
          </button>
          <NotificationDate time={notification.time}/>
        </div>
      </li>
    );
  });

  return (
    <div className='container notifications'>
      <ul className='notifications-list'>{notificationList}</ul>
    </div>
  );
}
export default Notifications;
