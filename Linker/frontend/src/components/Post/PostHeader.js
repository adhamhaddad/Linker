import React from 'react';
import { Link } from 'react-router-dom';
import PostDate from './Validation/PostDate';
import PostController from './PostController';
import classes from '../../css/PostHeader.module.css';

function PostHeader({
  user_id,
  post_id,
  post_user_id,
  username,
  timedate,
  profile,
  fname,
  lname,
  onDeletePost
}) {
  return (
    <div className={classes['post-header']}>
      <div className={classes['post-info']}>
        <Link
          to={`/profile/${username}`}
          className={classes['profile-image']}
          // style={{
          //   backgroundImage: profile.trim().length > 0 && `url(${profile})`
          // }}
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
      <PostController
        user_id={user_id}
        post_id={post_id}
        post_user_id={post_user_id}
        onDeletePost={onDeletePost}
      />
    </div>
  );
}
export default PostHeader;
