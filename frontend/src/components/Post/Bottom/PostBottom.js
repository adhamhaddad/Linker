import React from 'react';
import './PostBottom.css';

function PostBottom(props) {
  return (
    <div className='post-bottom'>
      <button className='btn' title='Like'>
        <i className='fa-solid fa-thumbs-up'></i>
        <span>like</span>
      </button>
      <div className='comment'>
        <form onSubmit={props.onSubmitHandler}>
          <input
            type='text'
            placeholder='Comment ...'
            title='Comment'
            value={props.addComment}
            onChange={props.addCommentsHandler}
          />
          <i className='fa-solid fa-paper-plane' onClick={props.onSubmitHandler}></i>
        </form>
      </div>
      <button title='Share'>
        <i className='fa-solid fa-share'></i>
        <span>share</span>
      </button>
    </div>
  );
}
export default PostBottom;
