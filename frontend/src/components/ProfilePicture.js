import React, { useState, useContext } from 'react';
import Modal from './Modal';
import useHttp from '../hooks/use-http';
import apiUrlContext from '../utils/api-urls';
import classes from '../css/ProfilePicture.module.css';

const ProfilePicture = ({ isLoading, user_id, profile_picture }) => {
  const { sendRequest } = useHttp();
  const [pickedPicture, setPickedPicture] = useState();
  const [fPP, setFPP] = useState(false);
  const apiCtx = useContext(apiUrlContext);

  const profileFullSizeHandler = () => {
    setFPP((prev) => !prev);
  };

  const consoleResponse = (res) => {
    console.log(res);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    setPickedPicture(e.target.files[0]);
    if (e.target.files[0].length) {
      formData.append('user_id', user_id);
      formData.append('profile', user_id);
      sendRequest(
        'profile-picture',
        'PATCH',
        { user_id: user_id, profile_picture: file },
        consoleResponse
      );
    } else {
      console.log('Please choose a picture');
      return;
    }
  };

  return (
    <>
      <div className={classes['image-card']}>
        <div
          className={`${classes['profile-picture']} ${
            isLoading ? classes['loading'] : null
          }`}
        >
          {!isLoading &&
            profile_picture !== null &&
            profile_picture !== undefined &&
            profile_picture.length > 0 && (
              <img
                id='profile'
                alt='Profile'
                title='Profile Picture'
                onClick={profileFullSizeHandler}
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${profile_picture}`}
              />
            )}
        </div>
        {/* <div className={classes['select-image']}>
          <form
            onSubmit={onFormSubmit}
          >
            <label htmlFor='upload-profile' className={classes.select}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z' />
              </svg>
            </label>
            <input
              type='file'
              id='upload-profile'
              name='profile-picture'
              className={classes['upload-profile']}
              onChange={onFormSubmit}
            />
          </form>
        </div> */}
      </div>

      {fPP && (
        <>
          <Modal onClick={profileFullSizeHandler}>
            <img
              id='profile'
              alt='Profile'
              title='Profile Picture'
              // className={classes['profile-picture']}
              crossOrigin='anonymous'
              src={`${apiCtx.url}/${profile_picture}`}
            />
          </Modal>
        </>
      )}
    </>
  );
};
export default ProfilePicture;
