import React, { useEffect } from 'react';
import CommentCard from './CommentCard';
import classes from '../../css/CommentsBox.module.css';

const CommentsBox = ({ comments, post_user_id, onHide, onChangeComment }) => {
  const commentsList =
    comments.length &&
    comments
      .map((comment) => {
        return (
          <CommentCard
            comment={comment}
            post_user_id={post_user_id}
            onChangeComment={onChangeComment}
            key={`${comment.comment_id} ${new Date(
              comment.timedate
            ).getTime()}`}
          />
        );
      })
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  useEffect(() => {
    onHide
      ? document.querySelector('main').scrollTo({
          top:
            document.querySelector('#post-comments').offsetTop +
            document.querySelector('#post-comments').offsetHeight,
          behavior: 'smooth'
        })
      : document.querySelector('main').scrollTo({
          top: document.querySelector('#post-bottom').offsetTop,
          behavior: 'smooth'
        });
  }, []);

  return (
    <div className={classes['post-comments']} id='post-comments'>
      <div className={classes['comments-controller']}>
        <p>All comments on this post</p>
        <button onClick={onHide}>hide comments</button>
      </div>
      <ul className={classes['comments-list']}>{commentsList}</ul>
    </div>
  );
};
export default CommentsBox;
