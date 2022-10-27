import React, { useState, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostController.module.css';

function PostController({
  post_id,
  post_user_id,
  onSavePost,
  onDeletePost,
  onEditPost
}) {
  const authCtx = useContext(AuthenticateContext);
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
      { user_id: authCtx.user.user_id, post_id: post_id },
      null
    );
  };
  
  const onEditPostToggle = () => {
    onEditPost((prev) => !prev);
  };
  return (
    <div className={classes['post-controller']}>
      <button onClick={slidersHandler}></button>
      {sliders && (
        <div className={classes['post-options']}>
          <button onClick={onSavePost} className={classes['save-post']}>
            save
          </button>
          {post_user_id === authCtx.user.user_id && (
            <>
              <button onClick={onEditPostToggle} className={classes['edit-post']}>
                edit
              </button>
              <button
                onClick={onDeleteHandler}
                className={classes['delete-post']}
              >
                {isLoading ? 'deleting..' : 'delete'}
              </button>
            </>
          )}
          {post_user_id !== authCtx.user.user_id && (
            <button className={classes['report-post']}>report</button>
          )}
        </div>
      )}
    </div>
  );
}
export default PostController;
