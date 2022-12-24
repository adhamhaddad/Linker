import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import PostHeader from '../components/Post/PostHeader';
import PostContent from '../components/Post/PostContent';
import PostBottom from '../components/Post/PostBottom';
import PostReactions from '../components/Post/PostReactions';
import PostCommments from '../components/Post/PostComments';
import UserCard from '../components/UserCard';
import AuthenticateContext from '../utils/authentication';
import * as postController from '../utils/post-utiles';
import classes from '../css/Post.module.css';

const Post = ({ socket }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [post, setPost] = useState({
    post_id: '',
    user_id: '',
    profile_picture: '',
    username: '',
    first_name: '',
    last_name: '',
    timedate: '',
    content: { caption: '', img: '', video: '' }
  });
  const [likesList, setLikesList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const params = useParams();
  const authCtx = useContext(AuthenticateContext);

  const getPost = () => {
    sendRequest(
      `post?username=${params.username}&post_id=${params.post_id}`,
      'GET',
      {},
      (data) => postController.transformPost(data, setPost)
    );
    sendRequest(
      `post/likes?post_id=${params.post_id}`,
      'GET',
      {},
      setLikesList
    );
    sendRequest(
      `comments?post_id=${params.post_id}`,
      'GET',
      {},
      setCommentsList
    );
    sendRequest(
      `post/shares?post_id=${params.post_id}`,
      'GET',
      {},
      setSharesList
    );
  };
  const likes =
    likesList.length > 0 &&
    likesList.map((like) => (
      <UserCard key={new Date(like.timedate).getTime()} value={like} />
    ));
  const shares =
    sharesList.length > 0 &&
    sharesList.map((share) => (
      <UserCard key={new Date(share.timedate).getTime()} value={share} />
    ));

  const checkIsLiked = () => {
    sendRequest(
      `post/like-check?post_id=${params.post_id}&user_id=${authCtx.user.user_id}`,
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
        if (data.data.post_id === post.post_id) {
          postController.newLikeAdded(data.data, setLikesList);
          checkIsLiked();
        }
      }
      if (data.action === 'UNSET_LIKE') {
        if (data.data.post_id === post.post_id) {
          postController.newLikeRemoved(data.data, setLikesList);
          checkIsLiked();
        }
      }
    });
    return () => {
      setPost({});
      setLikesList([]);
      setCommentsList([]);
      setSharesList([]);
      setIsLiked(false);
    };
  }, [params]);

  return (
    <div className={classes['post']}>
      {isLoading && isError === null && 'Loading'}
      {!isLoading && isError !== null && isError}
      {likesList.length > 0 && (
        <section className={classes['likes-section']}>
          <ul>{likes}</ul>
        </section>
      )}
      <section className={classes['post-section']}>
        <PostHeader
          post_id={post.post_id}
          post_user_id={post.user_id}
          post_profile_picture={post.profile_picture}
          post_username={post.username}
          post_first_name={post.first_name}
          post_last_name={post.last_name}
          post_timedate={post.timedate}
        />

        <PostContent content={post.content} post_id={post.post_id} />
        {(likesList.length > 0 ||
          commentsList.length > 0 ||
          sharesList.length > 0) && (
          <PostReactions
            likesList={likesList}
            commentsList={commentsList}
            sharesList={sharesList}
          />
        )}
        <PostBottom
          post_id={post.post_id}
          isLiked={isLiked}
          setCommentsList={setCommentsList}
        />
        <PostCommments
          post_user_id={post.user_id}
          post_id={post.post_id}
          commentsList={commentsList}
          setCommentsList={setCommentsList}
          socket={socket}
        />
      </section>
      {!isLoading && sharesList.length > 0 && (
        <section className={classes['shares-section']}>
          <ul className={classes['likes-list']}>{shares}</ul>
        </section>
      )}
    </div>
  );
};
export default Post;
