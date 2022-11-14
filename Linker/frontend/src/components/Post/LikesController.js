import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import classes from '../../css/LikesController.module.css';

const LikesController = ({ likes, onHide }) => {
  const likesList = likes
    .map((like) => (
      <li key={new Date(like.timedate).getTime()}>
        <Link
          to={`/profile/${like.username}`}
          className={classes['like-profile']}
        >
          {like.profile_picture !== null && (
            <img
              crossOrigin='anonymous'
              src={`http://192.168.1.6:4000/${like.profile_picture}`}
              alt={like.username}
            />
          )}
        </Link>
        <Link
          to={`/profile/${like.username}`}
          className={classes['like-username']}
        >
          {like.first_name} {like.last_name}
        </Link>
      </li>
    ))
    .sort((a, b) => b.key - a.key);
  return (
    <Modal>
      <div className={classes['post-likes']}>
        <div className={classes['likes-header']}>
          <h3>Likes</h3>
          <button onClick={onHide}></button>
        </div>
        <ul className={classes['likes-list']}>{likesList}</ul>
      </div>
    </Modal>
  );
};
export default LikesController;
