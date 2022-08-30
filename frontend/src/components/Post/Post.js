import React from 'react';
import './Post.css';

function Post(props) {
  const postTimeClac = (timedate) => {
    const time = timedate.split(' - ')[1];
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    const ampm = time.split(' ')[1];
    const filter = `${hours}:${minutes} ${ampm}`;
    return filter;
  };
  return (
    <div className='posts'>
      <div className='post-header'>
        <img src={props.profile} alt='Profile' />
        <span>
          {props.fname} {props.lname}
        </span>
        <p>posted: {postTimeClac(props.timedate)}</p>
      </div>
      <div className='post-content'>
        <p>{props.content}</p>
      </div>
      <div className='post-reactions'>
        <span className={props.reactions.likes.length ? 'active' : 'hidden'}>
          <img src='./images/reactions/like.png' />
          {props.reactions.likes[1]} and {props.reactions.likes.length} others
        </span>
        <p>
          <span
            className={props.reactions.comments.length ? 'active' : 'hidden'}
          >
            {props.reactions.comments.length} comments
          </span>
          <span className={props.reactions.shares ? 'active' : 'hidden'}>
            <i className='fa-solid fa-circle period'></i>
            {props.reactions.shares} shares
          </span>
        </p>
      </div>
      <div className='post-bottom'>
        <button className='btn' title='Like'>
          <i className='fa-solid fa-thumbs-up'></i>
          <span>like</span>
        </button>
        <div className='comment'>
          <input type='text' placeholder='Comment ...' title='Comment' />
          <i className='fa-solid fa-paper-plane'></i>
        </div>
        <button title='Share'>
          <i className='fa-solid fa-share'></i>
          <span>share</span>
        </button>
      </div>
    </div>
  );
}
export default Post;
