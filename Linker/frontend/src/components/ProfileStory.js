import React from 'react';
import classes from '../css/ProfileStory.module.css';

function ProfileStory({ story }) {
  return (
    <div className={classes.story}>
      <h3>
        <i className='fa-solid fa-book-open fa-1x'></i>
        <span>story</span>
      </h3>
      <p>{story}</p>
    </div>
  );
}
export default ProfileStory;
