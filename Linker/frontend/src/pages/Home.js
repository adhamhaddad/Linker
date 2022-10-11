import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import WindowContext from '../store/windowSize';
import Container from '../components/UI/Container';
import Error from '../components/Error';
import SpinnerLoading from '../components/Loading/Spinner';
import Post from '../components/Post/Post';
import classes from '../css/Home.module.css';

const Home = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [allPosts, setAllPosts] = useState([]);
  const [reactions, setReactions] = useState({
    likes: [
      { profile: './images/profile.jpg', username: 'Adham Ashraf' },
      { profile: './images/beso.jpg', username: 'Ahmed Emad' },
      { profile: './images/bassem.jpg', username: 'Bassem Hamada' },
      { profile: './images/simba.jpeg', username: 'Mohamed Khaled' }
    ],
    comments: [
      {
        id: '2',
        username: 'Ahmed Emad',
        profile: './images/beso.jpg',
        content: '❤️❤️',
        time: 'Tue Sep 13 2022 17:40:31 GMT+0200 (Eastern European Standard Time)'
      },
      {
        id: '1',
        username: 'Mohamed Khaled',
        profile: './images/simba.jpeg',
        content: '❤️❤️',
        time: 'Tue Sep 13 2022 17:35:31 GMT+0200 (Eastern European Standard Time)'
      }
    ],
    shares: [
      { profile: './images/beso.jpg', username: 'Ahmed Emad' },
      { profile: './images/simba.jpeg', username: 'Mohamed Khaled' }
    ]
  });

  const transformPost = (data) => {
    const transformedData = data.map((post) => {
      return {
        post_id: post.post_id,
        profile: '',
        username: 'adhamhaddad',
        fname: '',
        lname: '',
        timedate: post.timedate,
        content: {
          caption: post.caption,
          img: post.img,
          video: post.video
        },
        user_id: post.user_id
      };
    });
    setAllPosts(transformedData);
  };

  useEffect(() => {
    sendRequest('users/posts', 'GET', {}, transformPost);
  }, []);

  const posts =
    allPosts.length > 0 &&
    allPosts
      .map((post) => (
        <Post
          username={post.username}
          post_id={post.post_id}
          user_id={post.user_id}
          profile={post.profile}
          fname={post.fname}
          lname={post.lname}
          timedate={post.timedate}
          content={post.content}
          reactions={reactions}
          key={new Date(post.timedate).getTime()}
        />
      ))
      .sort((a, b) => b.key - a.key);
  return (
    <>
      <Container>{posts.length > 0 && posts}</Container>
      {isLoading && <SpinnerLoading color='dark' />}
      {isError !== null && <Error message={isError} />}
    </>
  );
};
export default Home;
