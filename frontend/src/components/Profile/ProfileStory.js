import React from 'react';
import classes from '../../css/ProfileStory.module.css';

const ProfileStory = ({ story }) => {
  return (
    <div className={classes['profile-story']}>
      <h3>
        <i className='fa-solid fa-book-open fa-1x'></i>
        story
      </h3>
      <p>{story}</p>
    </div>
  );
}
export default ProfileStory;
