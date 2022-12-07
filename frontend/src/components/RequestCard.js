import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import apiUrlContext from '../utils/api-urls';
import classes from '../css/RequestCard.module.css';

const RequestCard = ({ request, acceptRequest, ignoreRequest }) => {
  const apiCtx = useContext(apiUrlContext);

  return (
    <li className={classes['request-card']}>
      <Link
        to={`/profile/${request.username}`}
        className={classes['request-profile']}
      >
        {request.profile_picture !== null && (
          <img
            crossOrigin='anonymous'
            src={`${apiCtx.url}/${request.profile_picture}`}
            alt={request.username}
          />
        )}
      </Link>
      <Link
        to={`/profile/${request.username}`}
        className={classes['request-name']}
      >
        {request.first_name} {request.last_name}
      </Link>
      <button
        className={`${classes['request-ignore']} ${classes['actions']}`}
        onClick={() => ignoreRequest(request)}
      >
        <i className='fa-solid fa-xmark'></i>
      </button>
      <button
        className={`${classes['request-accept']} ${classes['actions']}`}
        onClick={() => acceptRequest(request)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </li>
  );
};
export default RequestCard;
