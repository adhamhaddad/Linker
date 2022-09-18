import React from 'react';
import Logo from './Logo/Logo';
import SearchBar from './Search/Searchbar';
import MenuList from './Menu/MenuList';
import './Header.css';

function Header(props) {
  return (
    <nav className='header'>
      <div className='container header'>
        <Logo />
        <SearchBar />
        <MenuList
          changeComponent={props.changeComponent}
        />
      </div>
    </nav>
  );
}
export default Header;
