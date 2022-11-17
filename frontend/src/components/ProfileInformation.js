import React from 'react';
import classes from '../css/ProfileInformation.module.css';

const ProfileInformation = ({
  job_title,
  relationship,
  education,
  location
}) => {
  return (
    <div className={classes['user-info']}>
      <ul>
        {job_title !== null && (
          <li className={classes['info-work']}>
            <i className='fa-solid fa-briefcase'></i>
            <span>{job_title}</span>
          </li>
        )}
        {education !== null && (
          <li className={classes['info-education']}>
            <i className='fa-solid fa-graduation-cap'></i>
            <span>{education}</span>
          </li>
        )}
        {relationship !== null && (
          <li className={classes['info-relation']}>
            <i className='fa-solid fa-heart'></i>
            <span>{relationship}</span>
          </li>
        )}
        {location !== null && (
          <li className={classes['info-lives']}>
            <i className='fa-solid fa-location-dot'></i>
            <span>{location}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default ProfileInformation;
