import React from 'react';
import SearchBar from './Search/Searchbar';
import MenuList from './Menu/MenuList';
import './Header.css';

function Header() {
  return (
    <nav className='header'>
      <div className='container'>
        <img src='./images/comp.png' alt='Logo' className='logo' />
        <SearchBar />
        <MenuList />
      </div>
    </nav>
  );
}
export default Header;
