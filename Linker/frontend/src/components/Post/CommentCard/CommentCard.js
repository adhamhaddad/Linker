import React from 'react';
import CommentDate from '../Validation/CommentDate';
import './CommentCard.css';

function CommentCard(props) {
  return (
    <li className='comment-card'>
      <div className='comment-header'>
        <a
          href={`http://www.network.com/${props.comment.username}`}
          className='profile'
        >
          <img src={props.comment.profile} alt='profile' />
        </a>
        <h4 className='username'>
          <a href={`http://www.network.com/${props.comment.username}`}>
            {props.comment.username}
          </a>
        </h4>
        <CommentDate time={props.comment.time} />
      </div>
      <div className='comment-content'>{props.comment.content}</div>
      <div className='comment-footer'>
        <button>like</button>
        <i className='fa-solid fa-circle period'></i>
        <button>reply</button>
      </div>
    </li>
  );
}
export default CommentCard;
