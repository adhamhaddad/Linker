import React from 'react';
import { Link } from 'react-router-dom';
import CommentDate from '../../../Validation/CommentDate';
import './CommentCard.css';

function CommentCard({
  comment_user_id,
  username,
  fname,
  lname,
  profile,
  time,
  content
}) {
  return (
    <li className='comment-card'>
      <div className='comment-header'>
        <Link
          to={`/profile/${username}?user_id=${comment_user_id}`}
          className='profile'
        >
          <img src={profile} alt='profile' />
        </Link>
        <h4 className='username'>
          <a href={`/profile/${username}?user_id=${comment_user_id}`}>
            {fname} {lname}
          </a>
        </h4>
        <CommentDate time={time} />
      </div>
      <div className='comment-content'>{content}</div>
      <div className='comment-footer'>
        <button>like</button>
        <i className='fa-solid fa-circle period'></i>
        <button>reply</button>
      </div>
    </li>
  );
}
export default CommentCard;
