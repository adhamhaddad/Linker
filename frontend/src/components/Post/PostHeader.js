import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostDate from '../../utils/date-utils';
import PostController from './PostController';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/PostHeader.module.css';

const PostHeader = ({
  post_id,
  post_profile_picture,
  post_user_id,
  post_username,
  post_first_name,
  post_last_name,
  post_timedate,
  isEdit,
  onEditPost,
  onSaveChanges
}) => {
  const apiCtx = useContext(apiUrlContext);

  return (
    <div className={classes['post-header']}>
      <div className={classes['post-info']}>
        <Link
          to={`/profile/${post_username}`}
          className={classes['profile-image']}
        >
          {post_profile_picture !== undefined &&
            post_profile_picture.length > 0 && (
              <img
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${post_profile_picture}`}
                alt={post_profile_picture}
              />
            )}
        </Link>

        <div className={classes['post-details']}>
          <Link
            to={`/profile/${post_username}`}
            className={classes['post-username']}
          >
            {post_first_name} {post_last_name}
          </Link>
          <span className={classes['post-date']}>
            <PostDate timedate={post_timedate} />
            <i className='fa-solid fa-earth-africa'></i>
          </span>
        </div>
      </div>
      {isEdit && (
        <div>
          <button className={classes['update-post']} onClick={onSaveChanges}>
            save
          </button>
          <button className={classes['discard-update']}>discard</button>
        </div>
      )}
      <PostController
        post_id={post_id}
        post_user_id={post_user_id}
        onEditPost={onEditPost}
      />
    </div>
  );
};
export default PostHeader;
