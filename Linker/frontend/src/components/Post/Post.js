import React, { useState } from 'react';
import CommentsController from './ReactionsController/Comments/CommentsController';
import Reactions from './Reactions/Reactions';
import PostContent from './Content/PostContent';
import PostHeader from './Header/PostHeader';
import PostBottom from './Bottom/PostBottom';
import LikesController from './ReactionsController/Likes/LikesController';
import SharesController from './ReactionsController/Shares/SharesController';
import './Post.css';

function Post(props) {
  const [commentsList, setCommentsList] = useState(false);
  const [likesList, setLikesList] = useState(false);
  const [sharesList, setSharesList] = useState(false);
  const [addComment, setAddComment] = useState('');
  const [addLike, setAddLike] = useState('');

  const showLikesHandler = () => {
    setLikesList((prev) => {
      return prev ? false : true;
    });
  };
  const showCommentsHandler = () => {
    setCommentsList((prev) => {
      return prev ? false : true;
    });
  };
  const showSharesHandler = () => {
    setSharesList((prev) => {
      return prev ? false : true;
    });
  };

  const addCommentsHandler = (e) => {
    setAddComment(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.setReactions(e.target.children);
    setAddComment('');
  };

  return (
    <div className='posts'>
      <PostHeader
        profile={props.profile}
        fname={props.fname}
        lname={props.lname}
        timedate={props.timedate}
        id={props.id}
        deletePostHandler={props.deletePostHandler}
      />
      <PostContent content={props.content} />
      <Reactions
        reactions={props.reactions}
        showLikesHandler={showLikesHandler}
        showCommentsHandler={showCommentsHandler}
        showSharesHandler={showSharesHandler}
      />
      <PostBottom
        onSubmitHandler={onSubmitHandler}
        addComment={addComment}
        addCommentsHandler={addCommentsHandler}
      />
      {likesList && (
        <LikesController
          likes={props.reactions.likes}
          hideLikes={showLikesHandler}
        />
      )}
      {commentsList && (
        <CommentsController
          comments={props.reactions.comments}
          hideComments={showCommentsHandler}
        />
      )}
      {sharesList && (
        <SharesController
          shares={props.reactions.shares}
          hideShares={showSharesHandler}
        />
      )}
    </div>
  );
}
export default Post;
