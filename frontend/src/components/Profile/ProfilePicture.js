import React, { useState, useContext } from 'react';
import Modal from '../Modal';
import useHttp from '../../hooks/use-http';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/ProfilePicture.module.css';

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
