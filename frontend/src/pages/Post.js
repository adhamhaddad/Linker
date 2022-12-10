import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import PostHeader from '../components/Post/PostHeader';
import PostContent from '../components/Post/PostContent';
import PostBottom from '../components/Post/PostBottom';
import PostReactions from '../components/Post/PostReactions';
import PostCommments from '../components/Post/PostComments';
import UserCard from '../components/UserCard';
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
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [shares, setShares] = useState([]);
  const params = useParams();

  // TRANSFORM POST
  const transformPost = (data) => {
    const transformedData = {
      ...data,
      content: {
        caption: data.post_caption,
        img: data.post_img,
        video: data.post_video
      }
    };
    setPost(transformedData);
  };

  const getPost = () => {
    sendRequest(
      `post?username=${params.username}&post_id=${params.post_id}`,
      'GET',
      {},
      transformPost
    );
    sendRequest(`post/likes?post_id=${params.post_id}`, 'GET', {}, setLikes);
    sendRequest(`comments?post_id=${params.post_id}`, 'GET', {}, setComments);
    sendRequest(`post/shares?post_id=${params.post_id}`, 'GET', {}, setShares);
  };

  const likesList =
    likes.length > 0 &&
    likes.map((like) => (
      <UserCard key={new Date(like.timedate).getTime()} value={like} />
    ));
  const sharesList =
    shares.length > 0 &&
    shares.map((share) => (
      <UserCard key={new Date(share.timedate).getTime()} value={share} />
    ));

  useEffect(() => {
    getPost();
    socket.on('post_likes', (data) => {
      if (data.action === 'SET_LIKE') {
        console.log(data.data);
      }
      if (data.action === 'UNSET_LIKE') {
        console.log(data.data);
      }
    });
    return () => {
      setPost({});
      setLikes([]);
      setComments([]);
      setShares([]);
    };
  }, [params]);

  return (
    <div className={classes['post']}>
      {isLoading && isError === null && 'Loading'}
      {!isLoading && isError !== null && isError}
      {!isLoading && isError === null && (
        <>
          {likes.length > 0 && (
            <section className={classes['likes-section']}>
              <ul>{likesList}</ul>
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
            <PostReactions
              post_id={post.post_id}
              post_user_id={post.user_id}
              likes={likes}
              comments={comments}
              shares={shares}
            />
            <PostBottom
              post_id={post.post_id}
              likesList={likesList}
              setLikesList={setLikes}
              setCommentsList={setComments}
              setSharesList={setShares}
              socket={socket}
            />
            {comments.length > 0 && (
              <PostCommments
                comments={comments}
                post_user_id={post.user_id}
              />
            )}
          </section>
          {shares.length > 0 && (
            <section className={classes['shares-section']}>
              <ul className={classes['likes-list']}>{sharesList}</ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};
export default Post;
