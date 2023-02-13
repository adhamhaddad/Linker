import React from 'react';
import SearchBar from '../Searchbar';
import Logo from '../Logo';
import classes from '../../css/MiniNavigationBar.module.css';

const MiniNavigationBar = ({ style }) => {
  return (
    <div className={`${classes['minibar']} ${classes[style]}`}>
      <Logo />
      <SearchBar />
    </div>
  );
};
export default MiniNavigationBar;
