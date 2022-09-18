import React, { useState, useEffect } from 'react';
import './PostController.css';

function PostController(props) {
  const [sliders, setSliders] = useState(false);
  const slidersHandler = () => {
    setSliders((prev) => {
      return prev ? false : true;
    });
  };
  return (
    <div className='post-controller'>
      <button onClick={slidersHandler}>
        <i
          className={sliders ? 'fa-solid fa-xmark' : 'fa-solid fa-sliders'}
        ></i>
      </button>
      {sliders && (
        <ul onBlurCapture={slidersHandler}>
          <li onClick={props.deletePostHandler}>delete post</li>
          <li onClick={props.editPostHandler}>edit post</li>
        </ul>
      )}
    </div>
  );
}
export default PostController;
