import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useHttp from '../../hooks/use-http';
import PostCommments from './PostComments';
import Reactions from './PostReactions';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostBottom from './PostBottom';
import LikesController from './Like/LikesController';
import ReactionController from './Share/ReactionController';
import * as postController from '../../utils/post-utils';
import classes from '../../css/PostCard.module.css';
import AuthenticateContext from '../../utils/authentication';

const PostCard = ({
  post_id,
  post_user_id,
  post_profile_picture,
  post_username,
  post_first_name,
  post_last_name,
  post_timedate,
  post_content,
  theme,
  socket
}) => {
  const history = useHistory();
  const { sendRequest } = useHttp();
  const [isLiked, setIsLiked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [likesPort, setLikesPort] = useState(false);
  const [commentsPort, setCommentsPort] = useState(false);
  const [sharesPort, setSharesPort] = useState(false);
  const authCtx = useContext(AuthenticateContext);

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

  const getPost = () => {
    sendRequest(`post/likes?post_id=${post_id}`, 'GET', {}, setLikesList);
    sendRequest(`comments?post_id=${post_id}`, 'GET', {}, setCommentsList);
    sendRequest(`post/shares?post_id=${post_id}`, 'GET', {}, setSharesList);
  };

  const checkIsLiked = () => {
    sendRequest(
      `post/like-check?post_id=${post_id}&user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setIsLiked
    );
  };

  useEffect(() => {
    getPost();
    checkIsLiked();

    socket.on('likes', (data) => {
      if (data.action === 'SET_LIKE') {
        if (data.data.post_id === post_id) {
          postController.newLikeAdded(data.data, setLikesList);
          checkIsLiked();
        }
      }
      if (data.action === 'UNSET_LIKE') {
        if (data.data.post_id === post_id) {
          postController.newLikeRemoved(data.data, setLikesList);
          checkIsLiked();
        }
      }
    });
    return () => {};
  }, []);
  return (
    <div className={classes['posts']}>
      <PostHeader
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
      {(likesList.length > 0 ||
        commentsList.length > 0 ||
        sharesList.length > 0) && (
        <Reactions
          likesList={likesList}
          commentsList={commentsList}
          sharesList={sharesList}
          onShowLikes={showLikesHandler}
          onShowComments={showCommentsHandler}
          onShowShares={showSharesHandler}
        />
      )}
      <PostBottom
        post_id={post_id}
        isLiked={isLiked}
        theme={theme}
        showCommentsHandler={showCommentsHandler}
      />
      {likesPort && (
        <ReactionController
          title='Likes'
          id='like_id'
          values={likesList}
          onHide={showLikesHandler}
        />
      )}
      {commentsPort && (
        <PostCommments
          post_user_id={post_user_id}
          post_id={post_id}
          commentsList={commentsList}
          // onChangeComment={setCommentsList}
          setCommentsList={setCommentsList}
          onHide={showCommentsHandler}
          socket={socket}
        />
      )}
      {sharesPort && (
        <ReactionController
          title='Shares'
          id='share_id'
          values={sharesList}
          onHide={showSharesHandler}
        />
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
