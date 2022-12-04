import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import classes from '../css/Theme.module.css';

const Theme = () => {
  const [themes, setThemes] = useState({
    post_color: '',
    profile_cover: '',
    home_color: '',
    header_color: '',
    body_color: ''
  });
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const getTheme = () => {
    sendRequest(`theme?user_id=${authCtx.user.user_id}`, 'GET', {}, setThemes);
  };

  const onColorChange = (e) => {
    // setThemes((prev) => {
    //   return { ...prev, profile_cover: e.target.value };
    // });
    sendRequest(
      'theme',
      'POST',
      { user_id: authCtx.user.user_id, profile_cover: e.target.value },
      null
    );
    setThemes((prev) => {
      return { ...prev, profile_cover: e.target.value };
    });
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <div className={classes['theme']}>
      <div>
        <label htmlFor='theme'>Choose theme</label>
        <select id='theme' defaultValue={themes.profile_cover}>
          <option value=''>Default</option>
          <option value=''>user choosed color 1</option>
          <option value=''>user choosed color 2</option>
        </select>
      </div>
      <div>
        <label htmlFor='post_color'>Post Color?</label>
        <input type='color' id='post_color' />
      </div>
      <div>
        <label htmlFor='body_color'>Body Color?</label>
        <input type='color' id='body_color' />
      </div>
      <div>
        <label htmlFor='profile_cover'>Profile Color?</label>
        {themes.profile_cover !== 'null' && themes.profile_cover.length > 0 && (
          <p>
            {themes.profile_cover !== 'null' &&
              themes.profile_cover.length > 0 &&
              themes.profile_cover}
          </p>
        )}
        <input
          type='color'
          id='profile_cover'
          value={
            themes.profile_cover !== 'null' &&
            themes.profile_cover.length > 0 &&
            themes.profile_cover
          }
          onChange={onColorChange}
        />
      </div>
      <div>
        <label htmlFor='home_color'>Home Color?</label>
        <input type='color' id='home_color' />
      </div>
      <div>
        <label htmlFor='header_color'>Header Color?</label>
        <input type='color' id='header_color' />
      </div>
    </div>
  );
};
export default Theme;
