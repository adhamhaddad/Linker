import React from 'react';
import classes from '../../css/ProfileName.module.css';

const ProfileName = ({
  first_name,
  last_name,
  visitors,
  onViewVisitors,
  isLoading
}) => {
  return (
    <span className={classes['name-section']}>
      <span className={`${classes['username']} ${isLoading ? classes['loading'] : null}`}>
        {first_name} {last_name}
      </span>
      <span
        className={`${classes['visitors']} ${
          isLoading ? classes['loading'] : null
        }`}
        onClick={onViewVisitors}
      >
        <i className='fa-solid fa-eye'></i>{' '}
        {!isLoading && visitors !== undefined && visitors.length}
      </span>
    </span>
  );
};
export default ProfileName;
