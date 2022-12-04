import React, { useContext, useState } from 'react';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import AddPost from './AddPost';
import classes from '../../css/PostBox.module.css';

const PostBox = () => {
  const authCtx = useContext(AuthenticateContext);
  const apiCtx = useContext(apiUrlContext);
  const [postPort, setPostPort] = useState(false);

  const closePostPort = () => {
    setPostPort((prev) => !prev);
  };

  return (
    <>
      <div className={classes['post-box']}>
        <div className={classes['profile']}>
          {authCtx.user.profile_picture !== undefined &&
            authCtx.user.profile_picture.length > 0 && (
              <img
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${authCtx.user.profile_picture}`}
                alt={authCtx.user.username}
              />
            )}
        </div>
        <button className={classes['create-post-btn']} onClick={closePostPort}>
          Create a post
        </button>
      </div>
      {postPort && (
        <AddPost
          profile={authCtx.user.profile_picture}
          onClosePost={closePostPort}
        />
      )}
    </>
  );
};
export default PostBox;
