import React from 'react';
import classes from '../../css/FriendsLoader.module.css';

const FriendsLoader = () => {
  return (
    <div className={classes['loader']}>
      <div className={classes['cards']}></div>
      <div className={classes['cards']}></div>
      <div className={classes['cards']}></div>
    </div>
  );
};
export default FriendsLoader;
