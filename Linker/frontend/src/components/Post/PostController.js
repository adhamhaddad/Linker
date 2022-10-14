import React, { useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostController.module.css';

function PostController({
  user_id,
  post_id,
  post_user_id,
  onSavePost,
  onDeletePost
}) {
  const { isLoading, isError, sendRequest } = useHttp();
  const [sliders, setSliders] = useState(false);
  const slidersHandler = () => {
    setSliders((prev) => !prev);
  };

  const onDeleteHandler = () => {
    onDeletePost((prev) => prev.filter((post) => post.post_id !== post_id));
    sendRequest(
      'user/post',
      'DELETE',
      { user_id: user_id, post_id: post_id },
      null
    );
  };
  const onEditPost = () => {
    sendRequest('user/post', 'PATCH', { user_id: user_id, post_id: post_id });
  };
  return (
    <div className={classes['post-controller']}>
      <button onClick={slidersHandler}></button>
      {sliders && (
        <div className={classes['post-options']}>
          <button onClick={onSavePost} className={classes.save}>
            save
          </button>
          {post_user_id === user_id && (
            <>
              <button onClick={onDeleteHandler} className={classes.delete}>
                {isLoading ? 'deleting..' : 'delete'}
              </button>
              <button onClick={onEditPost} className={classes.edit}>
                edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default PostController;
