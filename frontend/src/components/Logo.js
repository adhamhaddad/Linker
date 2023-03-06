import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from '../css/Logo.module.css';

const Logo = () => {
  const history = useHistory();

  const onLogoClick = () => {
    history.push('/settings');
  };
  return (
    <div className={classes['app-logo']} onClick={onLogoClick}>
      <span className={classes.logo}>
        <i className='fa-solid fa-link'></i>
      </span>
    </div>
  );
};
export default Logo;
