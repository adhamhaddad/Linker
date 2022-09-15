import React from 'react';
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
    <div className='layer'>
      <div className='post-shares'>
        <div className='shares-header'>
          <h3>Shares</h3>
          <button onClick={props.hideShares}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <ul className='shares-list'>{sharesList}</ul>
      </div>
    </div>
  );
}
export default SharesController;
