import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import classes from '../../css/SharesController.module.css';

const SharesController = ({ shares, onHide }) => {
  const sharesList = shares
    .map((share) => (
      <li key={new Date(share.timedate).getTime()}>
        <Link
          to={`/profile/${share.username}`}
          className={classes['share-profile']}
        ></Link>
        <Link
          to={`/profile/${share.username}`}
          className={classes['share-username']}
        >
          {share.first_name} {share.last_name}
        </Link>
      </li>
    ))
    .sort((a, b) => b.key - a.key);
  return (
    <Modal>
      <div className={classes['post-shares']}>
        <div className={classes['shares-header']}>
          <h3>Shares</h3>
          <button onClick={onHide}></button>
        </div>
        <ul className={classes['shares-list']}>{sharesList}</ul>
      </div>
    </Modal>
  );
};
export default SharesController;
