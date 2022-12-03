import React from 'react';
import Modal from '../Modal';
import UserCard from './UserCard';
import classes from '../../css/LikesController.module.css';

const LikesController = ({ likes, onHide }) => {
  const likesList =
    likes.length > 0 &&
    likes
      .map((like) => (
        <UserCard key={new Date(like.timedate).getTime()} like={like} />
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
