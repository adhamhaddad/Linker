import React from 'react';
import PostDate from '../Validation/PostDate';
import PostController from '../PostController/PostController';
import './PostHeader.css';

function PostHeader(props) {
  return (
    <div className='post-header'>
      <div className='info'>
        <img src={props.profile} alt='Profile' />
        <div>
          <span className='username'>
            {props.fname} {props.lname}
          </span>
          <span className='date'>
            <PostDate timedate={props.timedate} />
            <i className='fa-solid fa-earth-africa'></i>
          </span>
        </div>
      </div>
      <PostController post_id={props.id} deletePostHandler={props.deletePostHandler}/>
    </div>
  );
}
export default PostHeader;
