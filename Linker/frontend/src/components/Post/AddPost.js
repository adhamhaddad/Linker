import React, { useRef } from 'react';
import Modal from '../Modal';
import classes from '../../css/AddPost.module.css';

function AddPost({ user_id, fname, lname, onCreatePost, onClosePost }) {
  const caption = useRef('');
  const img = useRef('');
  const video = useRef('');

  const postFormHandler = (e) => {
    e.preventDefault();
    const captionValue = caption.current.value;
    const imgValue = img.current.value;
    const videoValue = video.current.value;
    if (
      captionValue.trim().length == 0 &&
      img.trim().length == 0 &&
      video.trim().length == 0
    ) {
      return;
    }
    onCreatePost({
      user_id: user_id,
      caption: captionValue,
      img: imgValue,
      video: videoValue
    });
    onClosePost();
  };

  return (
    <Modal>
      <div className={classes['create-post']}>
        <div className={classes['create-post__header']}>
          <div className={classes['create-post__user-photo']}></div>
          <h4 className={classes.username}>
            {fname} {lname}
          </h4>
          <button className={classes.discard} onClick={onClosePost}>
            discard
          </button>
        </div>

        <form method='POST' onSubmit={postFormHandler}>
          <div className={classes['create-post__content']}>
            <textarea
              type='text'
              placeholder='What do you want to talk about?'
              ref={caption}
            ></textarea>
            <label htmlFor='video' className={classes['video-input']}></label>
            <label htmlFor='image' className={classes['image-input']}></label>
            <input type='file' id='image' name='video' ref={img} />
            <input type='file' id='video' ref={video} />
          </div>

          <div className={classes['create-post__footer']}>
            <button type='submit' className={classes['post-button']}>
              Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default AddPost;
