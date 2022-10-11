import React from 'react';
import { Link } from 'react-router-dom';
import PostDate from '../Validation/PostDate';
import PostController from '../PostController/PostController';
import './PostHeader.css';

function PostHeader({ username, profile, fname, lname, timedate, post_id }) {
  return (
    <div className='post-header'>
      <div className='info'>
        <Link
          to={`/user/${username}`}
          className='profile-image'
          style={{ backgroundImage: profile.length > 0 && `url(${profile})` }}
        ></Link>

        <div>
          <span className='username'>
            {fname} {lname}
          </span>
          <span className='date'>
            <PostDate timedate={timedate} />
            <i className='fa-solid fa-earth-africa'></i>
          </span>
        </div>
      </div>

      <PostController post_id={post_id} />
    </div>
  );
}
export default PostHeader;
