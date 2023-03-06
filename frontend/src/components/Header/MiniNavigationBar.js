import React from 'react';
import SearchBar from '../Searchbar';
import Logo from '../Logo';
import classes from '../../css/MiniNavigationBar.module.css';

const MiniNavigationBar = () => {
  return (
    <div className={classes['minibar']}>
      <Logo />
      <SearchBar />
    </div>
  );
};
export default MiniNavigationBar;
