import React, { useState, useEffect } from 'react';
import NotificationCard from '../components/NotificationCard';
import Container from '../components/UI/Container';
import useHttp from '../hooks/use-http';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import classes from '../css/Notification.module.css';

const Notifications = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      username: 'ahmedemad',
      fname: 'Ahmed',
      lname: 'Emad',
      profile: '',
      time: 'Tue Sep 20 2022 12:30:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 2,
      username: 'mohamedsimba',
      fname: 'Mohamed',
      lname: 'Khaled',
      profile: '',
      time: 'Tue Sep 20 2022 12:31:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has liked on your post'
    },
    {
      id: 3,
      username: 'bassemhamada',
      fname: 'Bassem',
      lname: 'Hamada',
      profile: '',
      time: 'Tue Sep 20 2022 12:32:32 GMT+0200 (Eastern European Standard Time)',
      content: 'has commented on your post'
    }
  ]);
  const notificationItems = notifications
    .map((notification) => {
      return (
        <NotificationCard
          username={notification.username}
          fname={notification.lname}
          lname={notification.lname}
          profile={notification.profile}
          content={notification.content}
          time={notification.time}
          key={new Date(notification.time).getTime()}
        />
      );
    })
    .sort((a, b) => b.key - a.key);
  useEffect(() => {
    // sendRequest('/notifiications?user_id=test', 'GET', {}, setNotifications)
  }, []);
  return (
    <Container className='notifications'>
      {isLoading && <SpinnerLoading />}
      {!isLoading && isError !== null && <Error message={isError} />}
      {!isLoading && isError === null && (
        <ul className={classes['notifications-list']}>{notificationItems}</ul>
      )}
    </Container>
  );
};
export default Notifications;
