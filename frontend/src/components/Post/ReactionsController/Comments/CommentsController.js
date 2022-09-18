import React from 'react';
import CommentCard from '../../CommentCard/CommentCard';
import './CommentsController.css';

function CommentsController(props) {
  const comments =
    props.comments.length &&
    props.comments.map((comment) => {
      return <CommentCard comment={comment} key={comment.id} />;
    });
  return (
    <div className='post-comments'>
      <div className='comments-controller'>
        <p>All comments on this post</p>
        <button onClick={props.hideComments}>hide comments</button>
      </div>

      <div className='comments-list'>{comments}</div>
    </div>
  );
}
export default CommentsController;
