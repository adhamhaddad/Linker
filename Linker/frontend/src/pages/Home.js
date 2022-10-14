import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import Post from '../components/Post/Post';
import classes from '../css/Home.module.css';

const Home = ({user_id}) => {
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
      `users/posts?user_id=${authCtx.user.user_id}`,
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
      <Container className='posts'>{posts.length > 0 && posts}</Container>
      {isLoading && <SpinnerLoading color='dark' />}
      {isError !== null && <Error message={isError} />}
    </>
  );
};
export default Home;
