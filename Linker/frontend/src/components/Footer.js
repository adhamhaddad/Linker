import React from 'react';
import classes from '../css/Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <small>
        copyrights&copy; 2020 - {new Date().getFullYear()}
        <a
          href='https://www.linkedin.com/in/adhamashraf/'
          target='_blank'
          rel='noreferrer'
        >
          adham ashraf.
        </a>
        all rights reserved.
      </small>
    </footer>
  );
};
export default Footer;
