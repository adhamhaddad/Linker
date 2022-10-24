import React from 'react';
import SearchBar from './Searchbar';
import Logo from '../utils/Logo';
import classes from '../css/MiniNavigationBar.module.css';

const MiniNavigationBar = () => {
  return (
    <div className={classes.miniNav}>
      <Logo />
      <SearchBar />
    </div>
  );
};
export default MiniNavigationBar;
