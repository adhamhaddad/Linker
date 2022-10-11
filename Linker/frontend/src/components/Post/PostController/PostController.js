import React, { useState } from 'react';
import useHttp from '../../../hooks/use-http';
import './PostController.css';

function PostController({ post_id }) {
  const { isLoading, isError, sendRequest } = useHttp();
  const [sliders, setSliders] = useState(false);
  const slidersHandler = () => {
    setSliders((prev) => !prev);
  };

  const onDeleteHandler = () => {
    sendRequest('user/posts', 'DELETE', { id: post_id });
  };
  const onEditPost = () => {
    sendRequest('user/posts', 'PATCH', { id: post_id });
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
          <button onClick={onEditPost}>
            <i className='fa-solid fa-pencil'></i>
            <span>edit post</span>
          </button>
        </div>
      )}
    </div>
  );
}
export default PostController;
