import React, { useContext } from 'react';
import WindowContext from '../store/windowSize';
import Logo from '../utils/Logo';
import NavigationBar from './NavigationBar';
import Container from './UI/Container';
import classes from '../css/Header.module.css';

const Header = () => {
  const windowCtx = useContext(WindowContext);

  return (
    <nav className={classes.navbar}>
      <Container className='header'>
        {windowCtx.windowSize > 600 && <Logo />}
        <NavigationBar />
      </Container>
    </nav>
  );
};
export default Header;
