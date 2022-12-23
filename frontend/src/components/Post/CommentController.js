import React, { useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import classes from '../../css/CommentController.module.css';

const CommentController = ({
  comment_id,
  comment_user_id,
  onChangeComment
}) => {
  const authCtx = useContext(AuthenticateContext);
  const [toggleButton, setToggleButton] = useState(false);
  const { sendRequest } = useHttp();

  const onDeleteComment = () => {
    sendRequest('comment', 'DELETE', { comment_id: comment_id }, (data) =>
      onChangeComment((prev) =>
        prev.filter((comment) => comment.comment_id !== data.comment_id)
      )
    );
  };

  const onEditComment = () => {
    
    // sendRequest('comment', 'PATCH', { comment_id: comment_id });
  };

  const toggleOptions = () => {
    setToggleButton((prev) => !prev);
  };
  return (
    <div className={classes['comment-controller']}>
      <button onClick={toggleOptions} className='fa-solid fa-sliders'></button>
      {toggleButton && (
        <ul className={classes['comment-options']}>
          {comment_user_id === authCtx.user.user_id && (
            <>
              <li>
                <button onClick={onDeleteComment}>
                  <i className='fa-regular fa-trash-can'></i>
                  delete
                </button>
              </li>
              <li>
                <button onClick={onEditComment}>
                  <i className='fa-regular fa-pen-to-square'></i>
                  edit
                </button>
              </li>
            </>
          )}
          {comment_user_id !== authCtx.user.user_id && (
            <li>
              <button>
                <i className='fa-solid fa-circle-exclamation'></i>
                report
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default CommentController;
