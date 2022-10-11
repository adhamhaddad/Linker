import React from 'react';
import Logo from '../utils/Logo';
import SearchBar from './Searchbar';
import classes from '../css/TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={classes.navbar}>
      <Logo />
      <SearchBar />
    </div>
  );
};
export default TopNavbar;
