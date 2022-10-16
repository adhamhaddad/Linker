import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import Post from '../components/Post/Post';
import SearchBar from '../components/Searchbar';
import classes from '../css/Home.module.css';

const Home = ({ user_id, windowSize }) => {
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();
  const [allPosts, setAllPosts] = useState([]);

  const transformPost = (data) => {
    const transformedData = data.map((post) => {
      return {
        ...post,
        content: {
          caption: post.caption,
          img: post.img,
          video: post.video
        }
      };
    });
    setAllPosts(transformedData);
  };

  useEffect(() => {
    sendRequest(
      `users/posts/${authCtx.user.username}`,
      'GET',
      {},
      transformPost
    );
  }, []);

  const posts =
    allPosts.length > 0 &&
    allPosts
      .map((post) => (
        <Post
          user_id={user_id}
          post_user_id={post.user_id}
          post_id={post.post_id}
          username={post.username}
          fname={post.fname}
          lname={post.lname}
          profile={post.profile}
          timedate={post.timedate}
          content={post.content}
          key={new Date(post.timedate).getTime()}
        />
      ))
      .sort((a, b) => b.key - a.key);
  return (
    <>
      <div className={classes['home-page']}>
        {windowSize <= 600 && <SearchBar />}
        <Container className='home'>
          {posts && posts}
          {!posts && (
            <div className={classes['no-posts']}>
              <p>No posts found.</p>
              <p>please add friends to see there posts</p>
            </div>
          )}
        </Container>
        {isLoading && <SpinnerLoading color='dark' />}
        {isError !== null && <Error message={isError} />}
      </div>
    </>
  );
};
export default Home;
