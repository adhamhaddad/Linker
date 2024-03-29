import React from 'react';
import ProfileInformation from '../../pages/Profile/Information/ProfileInformation';
import ProfileStory from '../../pages/Profile/Story/ProfileStory';
import ProfileLinks from '../../pages/Profile/Links/ProfileLinks';
import Container from '../UI/Container/Container';
import classes from './Loading.module.css';

const LoadingPage = () => {
  return (
    <Container className='profile loading'>
      <div className={classes['left-side']}>
        <div className='user-id'>
          <div className={classes['profile-picture']}></div>
          <span className={classes.username}></span>
        </div>
        <ProfileInformation information='' />
      </div>
      <div className={classes['right-side']}>
        <ProfileStory story='' />
        <ProfileLinks links='' />
      </div>
    </Container>
  );
};
export default LoadingPage;
