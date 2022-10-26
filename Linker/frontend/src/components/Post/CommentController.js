import React, { useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import classes from '../../css/CommentController.module.css';

const CommentController = ({
  comment_id,
  comment_user_id,
  post_user_id,
  onChangeComment
}) => {
  const authCtx = useContext(AuthenticateContext);
  const [toggleButton, setToggleButton] = useState(false);
  const { sendRequest } = useHttp();

  const onDeleteComment = () => {
    sendRequest('post/comment', 'DELETE', { comment_id: comment_id }, (data) =>
      onChangeComment((prev) =>
        prev.filter((comment) => comment.comment_id !== data.comment_id)
      )
    );
  };

  const onEditComment = () => {
    sendRequest('post/comment', 'PATCH', { comment_id: comment_id });
  };

  const toggleOptions = () => {
    setToggleButton((prev) => !prev);
  };
  return (
    <div className={classes['comment-controller']}>
      <button onClick={toggleOptions}></button>
      <ul
        className={classes['comment-options']}
        style={{ display: toggleButton ? 'block' : 'none' }}
      >
        {comment_user_id === authCtx.user.user_id ||
          (post_user_id === authCtx.user.user_id && (
            <li>
              <button
                className={classes['delete-comment']}
                onClick={onDeleteComment}
              >
                delete
              </button>
            </li>
          ))}
        {comment_user_id === authCtx.user.user_id && (
          <li>
            <button className={classes['edit-comment']} onClick={onEditComment}>
              edit
            </button>
          </li>
        )}
        {comment_user_id !== authCtx.user.user_id && (
          <li>
            <button className={classes['report-comment']}>report</button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default CommentController;
