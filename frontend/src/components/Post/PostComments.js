import React, { useEffect, useState, useRef, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import CommentCard from './CommentCard';
import classes from '../../css/PostComments.module.css';

const PostCommments = ({
  commentsList,
  post_id,
  onHide,
  onChangeComment,
  setCommentsList,
  socket
}) => {
  const [newComment, setNewComment] = useState('');
  const authCtx = useContext(AuthenticateContext);
  const newCommentRef = useRef();
  const { sendRequest, isLoading } = useHttp();

  const onCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const createNewComment = (e) => {
    e.preventDefault();
    if (newCommentRef.current.value.trim().length === 0) {
      return;
    }

    sendRequest(
      'comment',
      'POST',
      {
        post_id: post_id,
        user_id: authCtx.user.user_id,
        comment_caption: newCommentRef.current.value,
        comment_img: null,
        comment_video: null
      },
      null
    );
    setNewComment('');
  };

  // Comment Handlers
  const newCommentAdded = (data) => {
    setCommentsList((prev) => [...prev, data]);
  };
  const newCommentUpdated = (data) => {
    setCommentsList((prev) =>
      prev.map((comment) =>
        comment.comment_id === data.comment_id
          ? { ...comment, ...data }
          : comment
      )
    );
  };
  const newCommentRemoved = (data) => {
    setCommentsList((prev) =>
      prev.filter((comment) => comment.comment_id !== data.comment_id)
    );
  };

  const comments =
    commentsList.length > 0 &&
    commentsList
      .map((comment) => {
        return (
          <CommentCard
            comment={comment}
            onChangeComment={onChangeComment}
            key={`${comment.comment_id} ${new Date(
              comment.timedate
            ).getTime()}`}
            socket={socket}
          />
        );
      })
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  useEffect(() => {
    onHide
      ? document.querySelector('main').scrollTo({
          top:
            document.querySelector('#post-comments').offsetTop +
            document.querySelector('#post-comments').offsetHeight,
          behavior: 'smooth'
        })
      : document.querySelector('main').scrollTo({
          top: document.querySelector('#post-bottom').offsetTop,
          behavior: 'smooth'
        });

    socket.on('comments', (data) => {
      if (data.action === 'CREATE_COMMENT') {
        if (data.data.post_id === post_id) {
          newCommentAdded(data.data);
        }
      }
      if (data.action === 'UPDATE_COMMENT') {
        if (data.data.post_id === post_id) {
          newCommentUpdated(data.data);
        }
      }
      if (data.action === 'DELETE_COMMENT') {
        if (data.data.post_id === post_id) {
          newCommentRemoved(data.data);
        }
      }
    });
  }, []);

  return (
    <div className={classes['post-comments']} id='post-comments'>
      <div className={classes['comments-controller']}>
        <p>All comments on this post</p>
        <button onClick={onHide}>hide comments</button>
      </div>
      <ul className={classes['comments-list']}>{comments}</ul>
      <form className={classes['add-comment']} onSubmit={createNewComment}>
        <textarea
          ref={newCommentRef}
          value={newComment}
          placeholder='New comment'
          onChange={onCommentChange}
        ></textarea>
        {!isLoading && (
          <button>
            <i className='fa-solid fa-paper-plane'></i>
          </button>
        )}
      </form>
    </div>
  );
};
export default PostCommments;
