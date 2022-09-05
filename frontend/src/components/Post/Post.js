import React from 'react';
import './Post.css';

function Post(props) {
  const validateTime = (timedate) => {
    const getDateNow = new Date()
      .toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      .split(',')[1]
      .split(':', 2)
      .join(':');
    const time = new Date(timedate)
      .toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      .split(',')[1];
    return `${time.split(':', 2).join(':')} ${time.split(' ')[2]}`;
  };
  return (
    <div className='posts'>
      <div className='post-header'>
        <img src={props.profile} alt='Profile' />
        <p>
          <span>
            {props.fname} {props.lname}
          </span>
          <span>
            {validateTime(props.timedate)}
            <i className='fa-solid fa-earth-africa'></i>
          </span>
        </p>
      </div>
      <div className='post-content'>
        <p>{props.content}</p>
      </div>
      <div className='post-reactions'>
        <p className={props.reactions.likes.length ? 'active' : 'hidden'}>
          <span>
            <img src='./images/reactions/like.png' />
            {props.reactions.likes[props.reactions.likes.length - 1]}
          </span>
          <span
            className={props.reactions.likes.length > 1 ? 'active' : 'hidden'}
          >
            and {props.reactions.likes.length - 1} others
          </span>
        </p>
        <p>
          <span
            className={props.reactions.comments.length ? 'active' : 'hidden'}
          >
            {props.reactions.comments.length} comments
          </span>
          <span className={props.reactions.shares ? 'active' : 'hidden'}>
            <i className='fa-solid fa-circle period'></i>
            {props.reactions.shares.length} shares
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
