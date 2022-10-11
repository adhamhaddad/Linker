import React from 'react';
import Modal from '../../../Modal';
import './LikesController.css';

const LikesController = ({ likes, onHideLikes }) => {
  const likesList = likes.map((like) => {
    return (
      <li key={like.username}>
        <a>
          <img src={like.profile} alt='profile' />
        </a>
        <a href='/'>
          <h4>{like.username}</h4>
        </a>
      </li>
    );
  });
  return (
    <Modal>
      <div className='post-likes'>
        <div className='likes-header'>
          <h3>Likes</h3>
          <button onClick={onHideLikes}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <ul className='likes-list'>{likesList}</ul>
      </div>
    </Modal>
  );
};
export default LikesController;
