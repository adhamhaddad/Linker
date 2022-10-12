import React from 'react';
import { Link } from 'react-router-dom';
import PostDate from './Validation/PostDate';
import PostController from './PostController';
import classes from '../../css/PostHeader.module.css';

function PostHeader({ username, profile, fname, lname, timedate, post_id }) {
  return (
    <div className={classes['post-header']}>
      <div className={classes['post-info']}>
        <Link
          to={`/user/${username}`}
          className={classes['profile-image']}
          style={{
            backgroundImage: profile.trim().length > 0 && `url(${profile})`
          }}
        ></Link>

        <div>
          <span className={classes['post-username']}>
            {fname} {lname}
          </span>
          <span className={classes['post-date']}>
            <PostDate timedate={timedate} />
          </span>
        </div>
      </div>
      <PostController post_id={post_id} />
    </div>
  );
}
export default PostHeader;
