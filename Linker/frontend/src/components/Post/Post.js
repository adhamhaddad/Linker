import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useHttp from '../../hooks/use-http';
import CommentsController from './ReactionsController/Comments/CommentsController';
import Reactions from './Reactions/Reactions';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostBottom from './PostBottom';
import LikesController from './ReactionsController/Likes/LikesController';
import SharesController from './ReactionsController/Shares/SharesController';
import classes from '../../css/Post.module.css';

const Post = ({
  user_id,
  post_id,
  post_user_id,
  username,
  fname,
  lname,
  profile,
  timedate,
  content,
  onDeletePost
}) => {
  const { sendRequest } = useHttp();
  const [likesList, setLikesList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [likesPort, setLikesPort] = useState(false);
  const [commentsPort, setCommentsPort] = useState(false);
  const [sharesPort, setSharesPort] = useState(false);

  const showLikesHandler = () => {
    setLikesPort((prev) => !prev);
  };
  const showCommentsHandler = () => {
    setCommentsPort((prev) => !prev);
  };
  const showSharesHandler = () => {
    setSharesPort((prev) => !prev);
  };

  useEffect(() => {
    sendRequest(`post/likes?post_id=${post_id}`, 'GET', {}, setLikesList);
    sendRequest(`post/comments?post_id=${post_id}`, 'GET', {}, setCommentsList);
    sendRequest(`post/shares?post_id=${post_id}`, 'GET', {}, setSharesList);
  }, []);
  return (
    <div className={classes.posts}>
      <PostHeader
        user_id={user_id}
        post_id={post_id}
        post_user_id={post_user_id}
        username={username}
        fname={fname}
        lname={lname}
        profile={profile}
        timedate={timedate}
        onDeletePost={onDeletePost}
      />
      <PostContent content={content} />
      <Reactions
        user_id={user_id}
        post_id={post_id}
        post_user_id={post_user_id}
        likes={likesList}
        comments={commentsList}
        shares={sharesList}
        onShowLikes={showLikesHandler}
        onShowComments={showCommentsHandler}
        onShowShares={showSharesHandler}
      />
      <PostBottom
        user_id={user_id}
        post_id={post_id}
        post_user_id={post_user_id}
        fname={fname}
        lname={lname}
        username={username}
        likesList={likesList}
        setLikesList={setLikesList}
        setCommentsList={setCommentsList}
        setSharesList={setSharesList}
      />
      {likesPort && (
        <LikesController likes={likesList} onHide={showLikesHandler} />
      )}
      {commentsPort && (
        <CommentsController
          comments={commentsList}
          onHide={showCommentsHandler}
        />
      )}
      {sharesPort && (
        <SharesController shares={sharesList} onHide={showSharesHandler} />
      )}
    </div>
  );
};
Post.propTypes = {
  user_id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fname: PropTypes.string.isRequired,
  lname: PropTypes.string.isRequired,
  // profile: PropTypes.string.isRequired,
  post_id: PropTypes.string.isRequired,
  timedate: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
};
export default Post;
