import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import PostCard from '../components/Post/PostCard';
import PostBox from '../components/Post/PostBox';
import AuthenticateContext from '../utils/authentication';
import classes from '../css/Home.module.css';

const Home = ({ user_id, socket }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const [posts, setPosts] = useState([]);
  const [themes, setThemes] = useState({
    profile_cover: authCtx.theme.profile_cover,
    home_color: authCtx.theme.home_color
  });

  const transformPost = (data) => {
    const transformedData = data.map((post) => {
      return {
        ...post,
        content: {
          caption: post.post_caption,
          img: post.post_img,
          video: post.post_video
        }
      };
    });
    setPosts(transformedData);
  };
  const newPostAdded = (post) => {
    setPosts((prev) => {
      return [
        ...prev,
        {
          ...post,
          content: {
            caption: post.post_caption,
            img: post.post_img,
            video: post.post_video
          }
        }
      ];
    });
  };
  const newPostUpdate = (data) => {
    setPosts((prev) => [...prev, data]);
  };
  const newPostDelete = (data) => {
    setPosts((prev) => prev.filter((post) => post.post_id !== data.post_id));
  };

  const getPosts = () => {
    sendRequest(`posts?user_id=${user_id}`, 'GET', {}, transformPost);
  };

  useEffect(() => {
    getPosts();
    socket.on('posts', (data) => {
      if (data.action === 'CREATE') {
        newPostAdded(data.data);
      }
      if (data.action === 'UPDATE') {
        newPostUpdate(data.data);
      }
      if (data.action === 'DELETE') {
        newPostDelete(data.data);
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
          key={`${post.post_id} ${new Date(post.timedate).getTime()}`}
        />
      ))
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  return (
    <div
      className={classes['home-page']}
      style={{ backgroundColor: themes.home_color }}
    >
      <Container>
        <PostBox theme={themes.profile_cover} />
        {isLoading && isError === null && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
        {!isLoading && isError === null && !posts && (
          <div className={classes['no-posts']}>
            <p>No posts found.</p>
            <p>please add friends to see there posts</p>
          </div>
        )}
        {postsList && postsList}
      </Container>
    </div>
  );
};
export default Home;
