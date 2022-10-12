import React, { useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostController.module.css';

function PostController({ post_id, onSavePost }) {
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
    <div className={classes['post-controller']}>
      <button onClick={slidersHandler}></button>
      {sliders && (
        <div className={classes['post-options']}>
          <button onClick={onSavePost} className={classes.save}>save</button>
          <button onClick={onDeleteHandler} className={classes.delete}>delete</button>
          <button onClick={onEditPost} className={classes.edit}>edit</button>
        </div>
      )}
    </div>
  );
}
export default PostController;
