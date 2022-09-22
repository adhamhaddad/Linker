import React, { useEffect } from 'react';
import CommentCard from '../../CommentCard/CommentCard';
import './CommentsController.css';

function CommentsController(props) {
  const comments =
    props.comments.length &&
    props.comments.map((comment) => {
      return <CommentCard comment={comment} key={comment.id} />;
    });

  useEffect(() => {
    props.hideComments
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
        <button onClick={props.hideComments}>hide comments</button>
      </div>

      <ul className='comments-list'>{comments}</ul>
    </div>
  );
}
export default CommentsController;
