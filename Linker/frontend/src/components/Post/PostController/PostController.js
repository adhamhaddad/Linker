import React, { useState, useEffect } from 'react';
import './PostController.css';

function PostController(props) {
  const [sliders, setSliders] = useState(false);
  const slidersHandler = () => {
    setSliders((prev) => (prev ? false : true));
  };

  const onDeleteHandler = () => {
    props.deletePostHandler({ id: props.post_id });
  };
  return (
    <div className='post-controller'>
      <button onClick={slidersHandler}>
        <i
          className={sliders ? 'fa-solid fa-xmark' : 'fa-solid fa-sliders'}
        ></i>
      </button>
      {sliders && (
        <div onBlurCapture={slidersHandler}>
          <button onClick={onDeleteHandler}>
            <i className='fa-solid fa-trash'></i>
            <span>delete post</span>
          </button>
          <button onClick={props.editPostHandler}>
            <i className='fa-solid fa-pencil'></i>
            <span>edit post</span>
          </button>
        </div>
      )}
    </div>
  );
}
export default PostController;
