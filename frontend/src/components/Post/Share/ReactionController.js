import React from 'react';
import Modal from '../../Modal';
import UserCard from '../../UserCard';
import classes from '../../../css/ReactionController.module.css';

const ReactionController = ({ values, title, id, onHide }) => {
  const valuesList =
    values.length > 0 &&
    values
      .map((user) => (
        <UserCard
          key={`${user[id]} ${new Date(user.timedate).getDate()}`}
          value={user}
        />
      ))
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  return (
    <Modal>
      <div className={classes['post-reactions']}>
        <div className={classes['reactions-header']}>
          <h3>{title}</h3>
          <button onClick={onHide} className='fa-solid fa-xmark'></button>
        </div>
        <ul className={classes['reactions-list']}>{valuesList}</ul>
      </div>
    </Modal>
  );
};
export default ReactionController;
