import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../../../Backdrop/Backdrop';
import Overlay from '../../../Overlay/Overlay';
import './LikesController.css';

function LikesController(props) {
  const likesList = props.likes.map((like) => {
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
          <div className='post-likes'>
            <div className='likes-header'>
              <h3>Likes</h3>
              <button onClick={props.hideLikes}>
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>
            <ul className='likes-list'>{likesList}</ul>
          </div>
        </Overlay>,
        document.getElementById('overlay-root')
      )}
    </>
  );
}
export default LikesController;
