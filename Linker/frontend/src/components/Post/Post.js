import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentsController from './ReactionsController/Comments/CommentsController';
import Reactions from './Reactions/Reactions';
import PostContent from './Content/PostContent';
import PostHeader from './PostHeader';
import PostBottom from './Bottom/PostBottom';
import LikesController from './ReactionsController/Likes/LikesController';
import SharesController from './ReactionsController/Shares/SharesController';
import classes from '../../css/Post.module.css';

const Post = ({
  user_id,
  username,
  fname,
  lname,
  profile,
  post_id,
  timedate,
  content,
  reactions
}) => {
  const [commentsList, setCommentsList] = useState(false);
  const [likesList, setLikesList] = useState(false);
  const [sharesList, setSharesList] = useState(false);
  const [addComment, setAddComment] = useState('');

  const showLikesHandler = () => {
    setLikesList((prev) => !prev);
  };
  const showCommentsHandler = () => {
    setCommentsList((prev) => !prev);
  };
  const showSharesHandler = () => {
    setSharesList((prev) => !prev);
  };

  const addCommentsHandler = (e) => {
    setAddComment(e.target.value);
  };

  return (
    <div className={classes.posts}>
      <PostHeader
        user_id={user_id}
        username={username}
        fname={fname}
        lname={lname}
        profile={profile}
        post_id={post_id}
        timedate={timedate}
      />
      <PostContent content={content} />
      <Reactions
        reactions={reactions}
        onShowLikes={showLikesHandler}
        onShowComments={showCommentsHandler}
        onShowShares={showSharesHandler}
      />
      <PostBottom
        addComment={addComment}
        addCommentsHandler={addCommentsHandler}
      />
      {likesList && (
        <LikesController likes={reactions.likes} onHide={showLikesHandler} />
      )}
      {commentsList && (
        <CommentsController
          comments={reactions.comments}
          onHide={showCommentsHandler}
        />
      )}
      {sharesList && (
        <SharesController
          shares={reactions.shares}
          onHide={showSharesHandler}
        />
      )}
    </div>
  );
};
Post.propTypes = {
  user_id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fname: PropTypes.string.isRequired,
  lname: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  post_id: PropTypes.string.isRequired,
  timedate: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
  // reactions: PropTypes.array.isRequired
};
export default Post;
