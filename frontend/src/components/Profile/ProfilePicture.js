import React, { useState, useContext, useEffect } from 'react';
import Modal from '../Modal';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/ProfilePicture.module.css';

const ProfilePicture = ({ isLoading, profile_picture }) => {
  const [fPP, setFPP] = useState(false);
  const apiCtx = useContext(apiUrlContext);

  const profileFullSizeHandler = () => {
    setFPP((prev) => !prev);
  };

  useEffect(() => {
    return () => setFPP(false);
  }, [profile_picture]);

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
