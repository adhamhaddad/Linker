import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import Post from '../components/Post/PostCard';
import classes from '../css/Home.module.css';

const Home = ({ user_id, socket }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [allPosts, setAllPosts] = useState([]);

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
    setAllPosts(transformedData);
  };
  const newPostAdded = (post) => {
    setAllPosts((prev) => {
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
    setAllPosts((prev) => [...prev, data]);
  };
  const newPostDelete = (data) => {
    setAllPosts((prev) => prev.filter((post) => post.post_id !== data.post_id));
  };
  useEffect(() => {
    sendRequest(`posts?user_id=${user_id}`, 'GET', {}, transformPost);
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
  }, []);

  const posts =
    allPosts.length > 0 &&
    allPosts
      .map((post) => (
        <Post
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
          key={new Date(post.timedate).getTime()}
        />
      ))
      .sort((a, b) => b.key - a.key);
  return (
    <div className={classes['home-page']}>
      <Container className='home'>
        {posts && posts}
        {!isLoading && isError === null && !posts && (
          <div className={classes['no-posts']}>
            <p>No posts found.</p>
            <p>please add friends to see there posts</p>
          </div>
        )}
        {isLoading && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
      </Container>
    </div>
  );
};
export default Home;
