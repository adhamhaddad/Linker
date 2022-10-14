import React, { useEffect } from 'react';
import CommentCard from '../../CommentCard/CommentCard';
import './CommentsController.css';

function CommentsController({ comments, onHide }) {
  const commentsList =
    comments.length &&
    comments.map((comment) => {
      return <CommentCard comment={comment} key={comment.id} />;
    });

  useEffect(() => {
    onHide
      ? document.querySelector('main').scrollTo({
          top:
            document.querySelector('.post-comments').offsetTop +
            document.querySelector('.post-comments').offsetHeight,
          behavior: 'smooth'
        })
      : document.querySelector('main').scrollTo({
          top: document.querySelector('.post-bottom').offsetTop,
          behavior: 'smooth'
        });
  }, []);

  return (
    <div className='post-comments'>
      <div className='comments-controller'>
        <p>All comments on this post</p>
        <button onClick={onHide}>hide comments</button>
      </div>

      <ul className='comments-list'>{commentsList}</ul>
    </div>
  );
}
export default CommentsController;
