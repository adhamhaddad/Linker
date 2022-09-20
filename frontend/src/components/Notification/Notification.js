import React, { useState } from 'react';
import NotificationCard from './NotificationCard/NotificationCard';
import Container from '../UI/Container/Container';
import classes from './Notification.module.css';

function Notifications() {
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      username: 'Mariam Maged',
      profile: './images/mrym.png',
      time: 'Tue Sep 20 2022 12:30:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 2,
      username: 'Mohamed Khaled',
      profile: './images/simba.jpeg',
      time: 'Tue Sep 20 2022 12:31:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 3,
      username: 'Bassem Hamada',
      profile: './images/bassem.jpg',
      time: 'Tue Sep 20 2022 12:32:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has commented on your post'
    },
    {
      id: 4,
      username: 'Ahmed Emad',
      profile: './images/beso.jpg',
      time: 'Tue Sep 20 2022 12:33:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    },
    {
      id: 5,
      username: 'Cup Coffee',
      profile: './images/coffee.jpg',
      time: 'Tue Sep 20 2022 12:34:32 GMT+0200 (Eastern European Standard Time)',
      content: 'shared your post'
    }
  ]);

  const notificationList = notificationsList
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
    <Container className={classes.notifications}>
      <ul className={classes['notifications-list']}>{notificationList}</ul>
    </Container>
  );
}
export default Notifications;
