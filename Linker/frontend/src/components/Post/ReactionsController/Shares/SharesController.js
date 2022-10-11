import React from 'react';
import Modal from '../../../Modal';
import './SharesController.css';

function SharesController({shares, onHide}) {
  const sharesList = shares.map((like) => {
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
      <div className='post-shares'>
        <div className='shares-header'>
          <h3>Shares</h3>
          <button onClick={onHide}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <ul className='shares-list'>{sharesList}</ul>
      </div>
    </Modal>
  );
}
export default SharesController;
