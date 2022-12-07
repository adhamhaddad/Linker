import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useHttp from '../../hooks/use-http';
import PostCommments from './PostComments';
import Reactions from './PostReactions';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostBottom from './PostBottom';
import LikesController from './LikesController';
import SharesController from './SharesController';
import classes from '../../css/PostCard.module.css';

const PostCard = ({
  user_id,
  username,
  first_name,
  last_name,
  post_id,
  post_user_id,
  post_profile_picture,
  post_username,
  post_first_name,
  post_last_name,
  post_timedate,
  post_content,
  socket,
}) => {
  const history = useHistory();
  const { isLoading, isError, sendRequest } = useHttp();
  const [isEdit, setIsEdit] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [likesPort, setLikesPort] = useState(false);
  const [commentsPort, setCommentsPort] = useState(false);
  const [sharesPort, setSharesPort] = useState(false);

  const openPost = () => {
    history.push(`/${post_username}/${post_id}`);
  };

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
    sendRequest(`comments?post_id=${post_id}`, 'GET', {}, setCommentsList);
    sendRequest(`post/shares?post_id=${post_id}`, 'GET', {}, setSharesList);
  }, []);
  return (
    <div
      className={classes['posts']}
    >
      <PostHeader
        user_id={user_id}
        post_id={post_id}
        post_user_id={post_user_id}
        post_profile_picture={post_profile_picture}
        post_username={post_username}
        post_first_name={post_first_name}
        post_last_name={post_last_name}
        post_timedate={post_timedate}
        isEdit={isEdit}
        onEditPost={setIsEdit}
      />
      <PostContent
        content={post_content}
        post_id={post_id}
        isEdit={isEdit}
        onClick={openPost}
      />
      <Reactions
        post_id={post_id}
        user_id={user_id}
        post_user_id={post_user_id}
        likes={likesList}
        comments={commentsList}
        shares={sharesList}
        onShowLikes={showLikesHandler}
        onShowComments={showCommentsHandler}
        onShowShares={showSharesHandler}
      />
      <PostBottom
        post_id={post_id}
        user_id={user_id}
        username={username}
        first_name={first_name}
        last_name={last_name}
        likesList={likesList}
        setLikesList={setLikesList}
        setCommentsList={setCommentsList}
        setSharesList={setSharesList}
        socket={socket}
      />
      {likesPort && (
        <LikesController likes={likesList} onHide={showLikesHandler} />
      )}
      {commentsPort && (
        <PostCommments
          post_user_id={post_user_id}
          comments={commentsList}
          onChangeComment={setCommentsList}
          onHide={showCommentsHandler}
        />
      )}
      {sharesPort && (
        <SharesController shares={sharesList} onHide={showSharesHandler} />
      )}
    </div>
  );
};
PostCard.propTypes = {
  user_id: PropTypes.string.isRequired,
  post_username: PropTypes.string.isRequired,
  post_first_name: PropTypes.string.isRequired,
  post_last_name: PropTypes.string.isRequired,
  // profile: PropTypes.string.isRequired,
  post_id: PropTypes.string.isRequired,
  post_timedate: PropTypes.string.isRequired,
  post_content: PropTypes.object.isRequired
};
export default PostCard;
