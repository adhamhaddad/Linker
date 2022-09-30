import React from 'react';
import ProfileInformation from '../Profile/Information/ProfileInformation';
import ProfileStory from '../Profile/Story/ProfileStory';
import ProfileLinks from '../Profile/Links/ProfileLinks';
import Container from '../UI/Container/Container';
import classes from './Loading.module.css';

function Loading() {
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
}
export default Loading;
