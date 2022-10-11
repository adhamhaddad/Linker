import React, { useRef } from 'react';
import Modal from '../../Modal';
import classes from './AddPost.module.css';

function AddPost(props) {
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
    props.addNewPost({
      caption: captionValue,
      img: imgValue,
      video: videoValue
    });

    props.closePostHandler();
  };

  return (
    <Modal>
      <div className={classes['create-post']}>
        <div className={classes['create-post__header']}>
          <div className={classes['create-post__user-info']}>
            <img
              src={props.information.profile}
              alt='profile'
              className={classes.profile}
            />
            <h4 className={classes.username}>
              {props.information.fname} {props.information.lname}
            </h4>
          </div>
          <button className={classes.discard} onClick={props.closePostHandler}>
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
            <input type='file' name='video' ref={img} />
            <input type='file' ref={video} />
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
