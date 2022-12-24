import React, { useRef, useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/AddPost.module.css';

const reader = new FileReader();
const AddPost = ({ profile, onClosePost, theme }) => {
  const [postImage, setPostImage] = useState();
  const [pikedImage, setPikedImage] = useState();
  const [isValid, setIsValid] = useState(false);
  const caption = useRef('');
  const img = useRef('');
  const video = useRef('');
  const apiCtx = useContext(apiUrlContext);
  const authCtx = useContext(AuthenticateContext);

  const createPost = (data) => {
    fetch(`${apiCtx.url}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authCtx.accessToken}` },
      body: data
    });
  };

  const onPictureChange = (e) => {
    setPostImage(e);
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setPostImage(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const captionValue = caption.current.value;
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

  useEffect(() => {
    if (!postImage) {
      return;
    }

    reader.onload = () => {
      setPikedImage(reader.result);
    };
    reader.readAsDataURL(postImage);
  }, [postImage]);
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
            {pikedImage && (
              <div className={classes['post-image']}>
                <img src={pikedImage} />
              </div>
            )}
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
              <input
                type='file'
                id='image'
                ref={img}
                onChange={onPictureChange}
              />
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
