import React, { useState, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostController.module.css';

function PostController({ post_id, post_user_id, onSavePost, onEditPost }) {
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, sendRequest } = useHttp();
  const [ellipsis, setEllipsis] = useState(false);

  const slidersHandler = () => {
    setEllipsis((prev) => !prev);
  };

  const onDeleteHandler = () => {
    sendRequest('posts', 'DELETE', { post_id: post_id }, null);
  };

  const onEditPostToggle = () => {
    onEditPost((prev) => !prev);
  };
  return (
    <div className={classes['post-controller']}>
      <button
        onClick={slidersHandler}
        className='fa-solid fa-ellipsis-vertical'
      ></button>
      {ellipsis && (
        <div className={classes['post-options']}>
          <button onClick={onSavePost}>
            <i className='fa-regular fa-bookmark'></i>
            save
          </button>
          {post_user_id === authCtx.user.user_id && (
            <>
              <button
                onClick={onEditPostToggle}
                className={classes['edit-post']}
              >
                <i className='fa-regular fa-pen-to-square'></i>
                edit
              </button>
              <button
                onClick={onDeleteHandler}
                className={classes['delete-post']}
              >
                <i className='fa-regular fa-trash-can'></i>
                {isLoading ? 'deleting..' : 'delete'}
              </button>
            </>
          )}
          {post_user_id !== authCtx.user.user_id && (
            <button className={classes['report-post']}>
              <i className='fa-solid fa-circle-exclamation'></i>
              report
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default PostController;
