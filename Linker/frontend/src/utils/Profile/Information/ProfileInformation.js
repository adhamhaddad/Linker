import React from 'react';
import classes from './ProfileInformation.module.css';

function ProfileInformation({ work, relation, education, lives }) {
  return (
    <div className={classes['user-info']}>
      <ul>
        <li className={classes['info-work']}>
          <i className='fa-solid fa-briefcase'></i>
          {work}
        </li>
        <li className={classes['info-education']}>
          <i className='fa-solid fa-graduation-cap'></i>
          {education}
        </li>
        <li className={classes['info-relation']}>
          <i className='fa-solid fa-heart'></i>
          {relation}
        </li>
        <li className={classes['info-lives']}>
          <i className='fa-solid fa-location-dot'></i>
          {lives}
        </li>
      </ul>
    </div>
  );
}
export default ProfileInformation;
