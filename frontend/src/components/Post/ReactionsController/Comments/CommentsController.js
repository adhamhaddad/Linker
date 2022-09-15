import React from 'react';
import CommentCard from '../../CommentCard/CommentCard';
import './CommentsController.css';

function CommentsController(props) {
  return (
    <div className='post-comments'>
      <div className='comments-controller'>
        <p>All comments on this post</p>
        <button onClick={props.hideComments}>hide comments</button>
      </div>
      <div className='comments-list'>
        {props.comments.length &&
          props.comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.id} />;
          })}
      </div>
    </div>
  );
}
export default CommentsController;
