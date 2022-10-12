import React, { useContext } from 'react';
import WindowContext from '../store/windowSize';
import BackButton from '../components/UI/BackButton';
import classes from '../css/Information.module.css';

const Information = () => {
  const windowCtx = useContext(WindowContext);

  return (
    <form className={classes['settings-form']}>
      {windowCtx.windowSize <= 600 && <BackButton path='/settings' />}
      <h3>information</h3>
      <div>
        <span>name</span>
        <p className={classes.username}>adham ashraf haddad</p>
        <button type='button'>edit</button>
      </div>

      <div>
        <span>gender</span>
        <p className={classes.gender}>male</p>
        <button>edit</button>
      </div>
      <div>
        <span>location</span>
        <p className='location'>egypt, giza</p>
        <button>edit</button>
      </div>
      <div>
        <span>birthday</span>
        <p className='birthday'>february, 8, 2002</p>
        <button>edit</button>
      </div>
      <div>
        <span>story</span>

        <p className='story'>
          Hi, I am Adham. I am a student at High Institute for Computers &
          Management Information Systems started in 2019 and I will graduate in
          2023. I started my Full-Stack journey in 2019 and built many projects
          using many languages. I also joined Udacity Nanodegree programs and
          got certified as a Professional Front End Web Developer. I worked too
          hard to achieve this progress, its my passion and I need an
          opportunity to show myself.
        </p>
        <button>edit</button>
      </div>

      <h3>links</h3>
      <div>
        <span>linkedIn</span>
        <p>https://linkedin.com/in/adhamashraf</p>
        <button>edit</button>
      </div>
      <div>
        <span>twitter</span>
        <p>https://twitter.com/AdhamHaddad_</p>
        <button>edit</button>
      </div>

      <h3>education</h3>
      <div>
        <span>work</span>
        <p>The Sparks Foundation - Web Development and Designing</p>
        <button>edit</button>
      </div>
      <div>
        <span>education</span>
        <p>Computers and Information Systems - B.S</p>
        <button>edit</button>
      </div>
    </form>
  );
};
export default Information;
