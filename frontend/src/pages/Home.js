import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import PostCard from '../components/Post/PostCard';
import PostBox from '../components/Post/PostBox';
import AuthenticateContext from '../utils/authentication';
import * as post from '../utils/post-utiles';
import PostsList from '../components/PostsList';
import classes from '../css/Home.module.css';

const Home = ({ user_id, socket }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    sendRequest(`posts?user_id=${user_id}`, 'GET', {}, (data) =>
      post.transformPosts(data, setPosts)
    );
  };

  useEffect(() => {
    getPosts();
    socket.on('posts', (data) => {
      if (data.action === 'CREATE_POST') {
        post.newPostAdded(data.data, setPosts);
      }
      if (data.action === 'UPDATE_POST') {
        post.newPostUpdate(data.data, setPosts);
      }
      if (data.action === 'DELETE_POST') {
        post.newPostDelete(data.data, setPosts);
      }
    });
    return () => {
      setPosts([]);
    };
  }, []);

  const postsList =
    posts.length > 0 &&
    posts
      .map((post) => (
        <PostCard
          user_id={user_id}
          post_id={post.post_id}
          post_user_id={post.user_id}
          post_profile_picture={post.profile_picture}
          post_username={post.username}
          post_first_name={post.first_name}
          post_last_name={post.last_name}
          post_profile={post.profile}
          post_timedate={post.timedate}
          post_content={post.content}
          socket={socket}
          theme={authCtx.theme.home_color}
          key={`${post.post_id} ${new Date(post.timedate).getTime()}`}
        />
      ))
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  return (
    <div className={classes['home-page']}>
      <Container>
        <PostBox theme={authCtx.theme.home_color} />
        {isLoading && isError === null && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
        {!isLoading && isError === null && !posts && (
          <div className={classes['no-posts']}>
            <p>No posts found.</p>
            <p>please add friends to see there posts</p>
          </div>
        )}
        {postsList.length && (
          <PostsList posts={postsList} theme={authCtx.theme.home_color} />
        )}
      </Container>
    </div>
  );
};
export default Home;
