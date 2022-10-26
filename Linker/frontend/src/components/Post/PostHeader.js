import React from 'react';
import { Link } from 'react-router-dom';
import PostDate from '../../Validation/PostDate';
import PostController from './PostController';
import classes from '../../css/PostHeader.module.css';

function PostHeader({
  user_id,
  post_id,
  post_user_id,
  post_username,
  post_timedate,
  post_profile,
  post_first_name,
  post_last_name,
  onDeletePost
}) {
  return (
    <div className={classes['post-header']}>
      <div className={classes['post-info']}>
        <Link
          to={`/profile/${post_username}`}
          className={classes['profile-image']}
          // style={{
          //   backgroundImage: profile.trim().length > 0 && `url(${profile})`
          // }}
        ></Link>

        <div>
          <Link
            to={`/profile/${post_username}`}
            className={classes['post-username']}
          >
            {post_first_name} {post_last_name}
          </Link>
          <span className={classes['post-date']}>
            <PostDate timedate={post_timedate} />
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
