import React, { useState, useRef, useContext, useEffect } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostBottom.module.css';

const PostBottom = ({
  post_id,
  likesList,
  setLikesList,
  setCommentList,
  socket
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const commentContentRef = useRef();
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);

  const commentContentHandler = (e) => {
    setCommentContent(e.target.value);
  };
  const checkIsLiked = () => {
    sendRequest(
      `post/like-check?post_id=${post_id}&user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setIsLiked
    );
  };

  // Like Handlers
  const addLike = () => {
    sendRequest(
      'post/likes',
      'POST',
      {
        post_id: post_id,
        user_id: authCtx.user.user_id
      },
      null
    );
  };
  const removeLike = () => {
    sendRequest('post/likes', 'DELETE', { isLiked }, null);
  };
  const newLikeAdded = (data) => {
    setLikesList((prev) => [...prev, data]);
  };
  const newLikeRemoved = (data) => {
    setLikesList((prev) =>
      prev.filter((like) => like.like_id !== data.like_id)
    );
  };
  const likeHandler = () => {
    if (isLiked.length) {
      removeLike();
    } else {
      addLike();
    }
  };
  // Comment Handlers
  const createComment = (e) => {
    e.preventDefault();
    if (commentContentRef.current.value.trim().length === 0) {
      return;
    }
    sendRequest(
      'comment',
      'POST',
      {
        post_id: post_id,
        user_id: authCtx.user.user_id,
        comment_caption: commentContentRef.current.value,
        comment_img: null,
        comment_video: null
      },
      null
    );
    setCommentContent('');
  };
  const newCommentAdded = (data) => {
    setCommentList((prev) => [...prev, data]);
  };
  const newCommentUpdated = (data) => {
    setCommentList((prev) =>
      prev.map((comment) =>
        comment.comment_id === data.comment_id
          ? { ...comment, ...data }
          : comment
      )
    );
  };
  const newCommentRemoved = (data) => {
    setCommentList((prev) =>
      prev.filter((comment) => comment.comment_id !== data.comment_id)
    );
  };

  useEffect(() => {
    checkIsLiked();
    socket.on('comments', (data) => {
      if (data.action === 'CREATE_COMMENT') {
        newCommentAdded(data.data);
      }
      if (data.action === 'UPDATE_COMMENT') {
        newCommentUpdated(data.data);
      }
      if (data.action === 'DELETE_COMMENT') {
        newCommentRemoved(data.data);
      }
    });
    socket.on('likes', (data) => {
      if (data.action === 'SET_LIKE') {
        newLikeAdded(data.data);
      }
      if (data.action === 'UNSET_LIKE') {
        newLikeRemoved(data.data);
      }
    });
    return () => {
      setIsLiked(null);
      setCommentContent('');
    };
  }, []);

  return (
    <div className={classes['post-bottom']} id='post-bottom'>
      <button className={classes['like-button']} title='Like'>
        like
      </button>
      <button className={classes['comment-button']} title='Comment'>
        comment
      </button>
      <button className={classes['share-button']} title='Share'>
        share
      </button>
    </div>
  );
};
export default PostBottom;
