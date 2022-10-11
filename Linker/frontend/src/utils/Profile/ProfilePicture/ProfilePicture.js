import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import useHttp from '../../../hooks/use-http';
import ImageInput from './ImageInput';
import classes from './ProfilePicture.module.css';

const ProfilePicture = ({ profile }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [fPP, setFPP] = useState(false);
  const [profileChange, setProfileChange] = useState('');
  const profileFullSizeHandler = () => {
    setFPP((prev) => !prev);
  };

  const changePictureHander = async (e) => {
    sendRequest(
      'user/information/profile-image',
      'PATCH',
      { id: '46ae6640-2ca1-48b5-a5c6-a34cb36cc33f', img: e },
      setProfileChange
    );
  };

  return (
    <>
      <div className={classes['image-card']}>
        <div
          id='profile'
          alt='Profile'
          title='Profile Picture'
          // style={{ backgroundImage: profile.length > 0 && `url(${profile})` }}
          className={classes['profile-picture']}
          onClick={profileFullSizeHandler}
        ></div>
        <div className={classes['select-image']}>
          <form>
            <label htmlFor='upload-profile' className={classes.select}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z' />
              </svg>
            </label>
            <ImageInput
              maxHeight={160.15}
              id='upload-profile'
              className={classes['upload-profile']}
            />
          </form>
        </div>
      </div>

      {fPP && (
        <>
          <Modal onClick={profileFullSizeHandler}>
            <div
              // style={{backgroundImage: profile.length > 0 && `url(${profile})`}}
              title='Profile'
              className={classes['profile-picture']}
            ></div>
          </Modal>
        </>
      )}
    </>
  );
};
export default ProfilePicture;
