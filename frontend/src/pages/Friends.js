import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FriendsLoader from '../components/Loading/FriendsLoader';
import Error from '../components/Error';
import apiUrlContext from '../utils/api-urls';
import classes from '../css/Friends.module.css';

const Friends = ({ friendsList, onDeleteFriend, isLoading, isError }) => {
  const [listSize, setListSize] = useState(false);
  const apiCtx = useContext(apiUrlContext);

  const showFriendsHandler = () => {
    setListSize((prev) => !prev);
  };

  const List =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.user_id}>
        <Link
          to={`/profile/${friend.username}`}
          className={
            listSize ? classes.max : `${classes['profile']} ${classes['min']}`
          }
        >
          <div className={classes['profile-picture']}>
            {!isLoading &&
              isError === null &&
              friend.profile_picture !== null &&
              friend.profile_picture.length > 0 && (
                <img
                  crossOrigin='anonymous'
                  src={`${apiCtx.url}/${friend.profile_picture}`}
                  alt={friend.username}
                />
              )}
          </div>
          <div className={classes['username']}>
            {friend.first_name} {friend.last_name}
          </div>
          <button
            onClick={() => onDeleteFriend(friend)}
            className={'fa-solid fa-user-xmark ' + classes['delete-friend']}
          ></button>
        </Link>
      </li>
    ));

  return (
    <section className={classes['friends']}>
      <h3>
        <i className='fa-solid fa-users'></i>
        friends {!isLoading && friendsList.length}
        {friendsList.length > 0 && (
          <button className={classes['show-all']} onClick={showFriendsHandler}>
            {listSize ? 'hide' : 'show'}
          </button>
        )}
      </h3>
      {isError !== null && <Error message={isError} />}
      <ul
        className={`${classes['friends-list']} ${
          listSize ? classes['max'] : classes['min']
        }`}
      >
        {isLoading && <FriendsLoader />}
        {List.length > 0 && List}
      </ul>
    </section>
  );
};
export default Friends;
