import React from 'react';
import Logo from './Logo/Logo';
import SearchBar from './Search/Searchbar';
import MenuList from './Menu/MenuList';
import Container from '../UI/Container/Container';
import classes from './Header.module.css';

function Header(props) {
  return (
    <nav className={classes.navbar}>
      <Container className='header'>
        {window.innerWidth > '600' && (
          <>
            <Logo />
            <SearchBar />
          </>
        )}
        <MenuList changeComponent={props.changeComponent} Home={props.Home}/>
      </Container>
    </nav>
  );
}
export default Header;
