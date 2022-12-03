import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CommentDate from '../../Validation/CommentDate';
import CommentController from './CommentController';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/CommentCard.module.css';

const CommentCard = ({ comment, onChangeComment, post_user_id }) => {
  const apiCtx = useContext(apiUrlContext);
  return (
    <li className={classes['comment-card']}>
      <div className={classes['comment-header']}>
        <Link
          to={`/profile/${comment.username}`}
          className={classes['comment-profile']}
        >
          {comment.profile_picture !== null && (
            <img
              crossOrigin='anonymous'
              src={`${apiCtx.url}/${comment.profile_picture}`}
              alt={comment.username}
            />
          )}
        </Link>
        <Link
          to={`/profile/${comment.username}`}
          className={classes['comment-username']}
        >
          {comment.first_name} {comment.last_name}
        </Link>
        <CommentDate time={comment.timedate} />
        <CommentController
          comment_id={comment.comment_id}
          post_user_id={post_user_id}
          comment_user_id={comment.user_id}
          onChangeComment={onChangeComment}
        />
      </div>
      <div className={classes['comment-content']}>
        {comment.comment_caption}
      </div>
      <div className={classes['comment-footer']}>
        <button onClick={(comment) => {}}>like</button>
        <i className='fa-solid fa-circle period'></i>
        <button>reply</button>
      </div>
    </li>
  );
};
export default CommentCard;
