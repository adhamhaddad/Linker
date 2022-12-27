import React, { useRef, useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/AddPost.module.css';

const reader = new FileReader();
const AddPost = ({ profile, onClosePost, theme }) => {
  const [postImage, setPostImage] = useState();
  const [postVideo, setPostVideo] = useState();
  const [pikedImage, setPikedImage] = useState();
  const [pikedVideo, setPikedVideo] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const caption = useRef('');
  const img = useRef('');
  const video = useRef('');
  const apiCtx = useContext(apiUrlContext);
  const authCtx = useContext(AuthenticateContext);

  const createPost = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiCtx.url}/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authCtx.accessToken}` },
        body: data
      });
      if (!response) {
        console.log(response);
      }
    } catch (err) {
      throw new Error('Error on posting');
    } finally {
      setIsLoading(false);
      onClosePost();
    }
  };

  const onVideoChange = (e) => {
    setPostVideo(e);
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setPostVideo(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
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
    const formData = new FormData();
    formData.append('user_id', authCtx.user.user_id);
    formData.append('post_caption', captionValue);
    formData.append('post_img', postImage);
    formData.append('post_video', postVideo);
    if (
      captionValue.trim().length == 0 &&
      (postImage === undefined || postImage.length == 0) &&
      postVideo.length == 0
    ) {
      return;
    }

    createPost(formData);
    // onClosePost();
  };

  useEffect(() => {
    if (postImage) {
      reader.onload = () => {
        setPikedImage(reader.result);
      };
      reader.readAsDataURL(postImage);
    }

    if (postVideo) {
      reader.onload = () => {
        setPikedVideo(reader.result);
        reader.readAsDataURL(postVideo);
      };
    }
  }, [postImage, postVideo]);
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

        <form
          method='POST'
          onSubmit={onFormSubmit}
          className={classes['create-post__form']}
        >
          <div className={classes['create-post__content']}>
            <textarea
              type='text'
              placeholder='What do you want to talk about?'
              ref={caption}
            ></textarea>
            {pikedImage && (
              <div className={classes['post-media']}>
                <img src={pikedImage} />
              </div>
            )}
            {pikedVideo && (
              <div className={classes['post-media']}>
                <video controls>
                  <source src={pikedVideo} type='video/mp4' />
                  content
                </video>
              </div>
            )}
          </div>
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
            <input
              type='file'
              id='video'
              ref={video}
              onChange={onVideoChange}
            />
          </div>

          <div className={classes['create-post__footer']}>
            {!isLoading && (
              <button
                type='submit'
                className={classes['post-button']}
                style={{ backgroundColor: theme }}
              >
                Post
              </button>
            )}
            {isLoading && (
              <button
                type='submit'
                className={classes['post-button']}
                style={{ backgroundColor: theme }}
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddPost;
