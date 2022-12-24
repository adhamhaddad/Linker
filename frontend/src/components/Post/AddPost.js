import React, { useRef, useContext, useState } from 'react';
import Modal from '../Modal';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import FilePicker from '../FilePicker';
import classes from '../../css/AddPost.module.css';

const AddPost = ({ profile, onClosePost, theme }) => {
  const [postImage, setPostImage] = useState();
  const caption = useRef('');
  const img = useRef('');
  const video = useRef('');
  const apiCtx = useContext(apiUrlContext);
  const authCtx = useContext(AuthenticateContext);
  const { sendRequest } = useHttp();

  const createPost = (data) => {
    fetch(`${apiCtx.url}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authCtx.accessToken}` },
      body: data
    });
  };

  const onPictureChange = (e) => {
    setPostImage(e);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const captionValue = caption.current.value;
    const imgValue = img.current.value;
    const videoValue = video.current.value;
    const formData = new FormData();
    formData.append('user_id', authCtx.user.user_id);
    formData.append('post_caption', captionValue);
    formData.append('post_img', postImage);
    formData.append('post_video', videoValue);
    if (
      captionValue.trim().length == 0 &&
      postImage.length == 0 &&
      video.trim().length == 0
    ) {
      return;
    }

    createPost(formData);
    onClosePost();
  };

  return (
    <Modal>
      <div className={classes['create-post']}>
        <div className={classes['create-post__header']}>
          <div className={classes['profile-picture']}>
            {profile !== null && profile.length > 0 && (
              <img crossOrigin='anonymous' src={`${apiCtx.url}/${profile}`} />
            )}
          </div>
          <h4 className={classes.username}>
            {authCtx.user.first_name} {authCtx.user.last_name}
          </h4>
          <button
            className={classes['discard-button']}
            onClick={onClosePost}
            style={{ backgroundColor: theme }}
          >
            discard
          </button>
        </div>

        <form method='POST' onSubmit={onFormSubmit}>
          <div className={classes['create-post__content']}>
            <textarea
              type='text'
              placeholder='What do you want to talk about?'
              ref={caption}
            ></textarea>
            <div className={classes['attachments']}>
              <label
                htmlFor='video'
                className='fa-solid fa-video'
                style={{ color: theme }}
              ></label>
              <label
                htmlFor='image'
                className='fa-solid fa-camera'
                style={{ color: theme }}
              ></label>
              <FilePicker onPicture={onPictureChange} />
              <input type='file' id='image' name='immage' ref={img} />
              <input type='file' id='video' ref={video} />
            </div>
          </div>

          <div className={classes['create-post__footer']}>
            <button
              type='submit'
              className={classes['post-button']}
              style={{ backgroundColor: theme }}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddPost;
