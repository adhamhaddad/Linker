import React from 'react';
import './ProfileStory.css';

function ProfileStory(props) {
  return (
    <div className='story'>
      <h3>
        <i className='fa-solid fa-book-open fa-1x'></i>
        <span>story</span>
      </h3>
      <p>{props.story}</p>
    </div>
  );
}
export default ProfileStory;
