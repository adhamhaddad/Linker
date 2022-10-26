import React from 'react';
import classes from '../css/ProfileInformation.module.css';

function ProfileInformation({ job_title, relationship, education, location }) {
  return (
    <div className={classes['user-info']}>
      <ul>
        {job_title !== null && (
          <li className={classes['info-work']}>
            <i className='fa-solid fa-briefcase'></i>
            {job_title}
          </li>
        )}
        {relationship !== null && (
          <li className={classes['info-education']}>
            <i className='fa-solid fa-graduation-cap'></i>
            {education}
          </li>
        )}
        {education !== null && (
          <li className={classes['info-relation']}>
            <i className='fa-solid fa-heart'></i>
            {relationship}
          </li>
        )}
        {location !== null && (
          <li className={classes['info-lives']}>
            <i className='fa-solid fa-location-dot'></i>
            {location}
          </li>
        )}
      </ul>
    </div>
  );
}
export default ProfileInformation;
