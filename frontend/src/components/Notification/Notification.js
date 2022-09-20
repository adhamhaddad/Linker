import React, { useState } from 'react';
import NotificationCard from './NotificationCard/NotificationCard';
import Container from '../UI/Container/Container';
import classes from './Notification.module.css';

function Notifications(props) {
  const notificationList = props.notificationsList
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
      <ul className={classes['notifications-list']}>{notificationList}</ul>
    </Container>
  );
}
export default Notifications;
