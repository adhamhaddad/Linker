import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import classes from '../css/Theme.module.css';

const Theme = () => {
  const [themes, setThemes] = useState({
    profile_cover: null,
    home_color: null,
    header_color: null
  });
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const getTheme = () => {
    sendRequest(
      `theme?username=${authCtx.user.username}`,
      'GET',
      {},
      setThemes
    );
  };

  const onProfileChange = (e) => {
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

  const onChangeHeader = (e) => {
    sendRequest(
      'theme',
      'POST',
      { user_id: authCtx.user.user_id, header_color: e.target.value },
      null
    );
    setThemes((prev) => {
      return { ...prev, header_color: e.target.value };
    });
  };

  useEffect(() => {
    getTheme();

    return () => {
      setThemes({});
    };
  }, []);

  return (
    <div className={classes['theme']}>
      <div>
        <label htmlFor='theme'>Choose theme</label>
        <select id='theme'>
          <option>Default</option>
          <option>user choosed color 1</option>
        </select>
      </div>
      <div>
        <label htmlFor='profile_cover'>Profile Cover</label>
        <p>
          {themes.profile_cover !== undefined &&
            themes.profile_cover !== null &&
            themes.profile_cover.length > 0 &&
            themes.profile_cover}
        </p>
        <input
          type='color'
          id='profile_cover'
          value={
            themes.profile_cover !== undefined &&
            themes.profile_cover !== null &&
            themes.profile_cover.length > 0 &&
            themes.profile_cover
          }
          onChange={onProfileChange}
        />
      </div>
      <div>
        <label htmlFor='home_color'>Home Color</label>
        <p>
          {themes.home_color !== undefined &&
            themes.home_color !== null &&
            themes.home_color.length > 0 &&
            themes.home_color}
        </p>
        <input type='color' id='home_color' />
      </div>
      <div>
        <label htmlFor='header_color'>Header Color</label>
        <p>
          {themes.header_color !== undefined &&
            themes.header_color !== null &&
            themes.header_color.length > 0 &&
            themes.header_color}
        </p>
        <input
          type='color'
          id='header_color'
          value={
            themes.header_color !== undefined &&
            themes.header_color !== null &&
            themes.header_color.length > 0 &&
            themes.header_color
          }
          onChange={onChangeHeader}
        />
      </div>
    </div>
  );
};
export default Theme;
