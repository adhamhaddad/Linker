import React from 'react';
import Modal from '../../../Modal/Modal';
import './SharesController.css';

function SharesController(props) {
  const sharesList = props.shares.map((like) => {
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
          <button onClick={props.hideShares}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <ul className='shares-list'>{sharesList}</ul>
      </div>
    </Modal>
  );
}
export default SharesController;
