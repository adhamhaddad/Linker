import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/UserCard.module.css';

const UserCard = ({ value }) => {
  const apiCtx = useContext(apiUrlContext);
  return (
    <li className={classes['card']}>
      <Link
        to={`/profile/${value.username}`}
        className={classes['card-profile']}
      >
        {value.profile_picture !== null && value.profile_picture.length > 0 && (
          <img
            crossOrigin='anonymous'
            src={`${apiCtx.url}/${value.profile_picture}`}
            alt={value.username}
          />
        )}
      </Link>
      <Link
        to={`/profile/${value.username}`}
        className={classes['card-username']}
      >
        {value.first_name} {value.last_name}
      </Link>
    </li>
  );
};
export default UserCard;
