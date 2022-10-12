import React, { useState } from 'react';
import NotificationCard from './Notification/NotificationCard/NotificationCard';
import Container from '../components/UI/Container';
import classes from '../css/Notification.module.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      username: 'Ahmed Emad',
      profile: '',
      time: 'Tue Sep 20 2022 12:30:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 2,
      username: 'Mohamed Khaled',
      profile: '',
      time: 'Tue Sep 20 2022 12:31:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 3,
      username: 'Bassem Hamada',
      profile: '',
      time: 'Tue Sep 20 2022 12:32:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has commented on your post'
    },
    {
      id: 4,
      username: 'Cup Coffee',
      profile: '',
      time: 'Tue Sep 20 2022 12:34:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    }
  ]);
  const notificationItems = notifications
    .map((notification) => {
      return (
        <NotificationCard
          profile={notification.profile}
          username={notification.username}
          content={notification.content}
          time={notification.time}
          key={new Date(notification.time).getTime()}
        />
      );
    })
    .sort((a, b) => a.key - b.key);

  return (
    <Container className='notifications'>
      <ul className={classes['notifications-list']}>{notificationItems}</ul>
    </Container>
  );
}
export default Notifications;
