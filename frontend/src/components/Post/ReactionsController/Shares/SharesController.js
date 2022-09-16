import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../../../Backdrop/Backdrop';
import Overlay from '../../../Overlay/Overlay';
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
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Overlay>
          <div className='post-shares'>
            <div className='shares-header'>
              <h3>Shares</h3>
              <button onClick={props.hideShares}>
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>
            <ul className='shares-list'>{sharesList}</ul>
          </div>
        </Overlay>,
        document.getElementById('overlay-root')
      )}
    </>
  );
}
export default SharesController;
