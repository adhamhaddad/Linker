import React from 'react';
import Logo from '../utils/Logo';
import NavigationBar from './NavigationBar';
import Container from './UI/Container';
import classes from '../css/Header.module.css';

const Header = ({ user_id, username, windowSize }) => {
  return (
    <nav className={classes.navbar}>
      <Container className='header'>
        {windowSize > 600 && <Logo />}
        <NavigationBar user_id={user_id} username={username} />
      </Container>
    </nav>
  );
};
export default Header;
