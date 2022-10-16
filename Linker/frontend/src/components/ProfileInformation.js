import React from 'react';
import classes from '../css/ProfileInformation.module.css';

function ProfileInformation({ work, relation, education, lives }) {
  return (
    <div className={classes['user-info']}>
      <ul>
        {work !== undefined && (
          <li className={classes['info-work']}>
            <i className='fa-solid fa-briefcase'></i>
            {work}
          </li>
        )}
        {relation !== undefined && (
          <li className={classes['info-education']}>
            <i className='fa-solid fa-graduation-cap'></i>
            {education}
          </li>
        )}
        {education !== undefined && (
          <li className={classes['info-relation']}>
            <i className='fa-solid fa-heart'></i>
            {relation}
          </li>
        )}
        {lives !== undefined && (
          <li className={classes['info-lives']}>
            <i className='fa-solid fa-location-dot'></i>
            {lives}
          </li>
        )}
      </ul>
    </div>
  );
}
export default ProfileInformation;
