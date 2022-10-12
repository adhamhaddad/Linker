import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import WindowContext from '../store/windowSize';
import AuthenticateContext from '../utils/authentication';
import Post from '../components/Post/Post';
import AddPost from '../components/Post/AddPost/AddPost';
import ProfileInformation from '../utils/Profile/Information/ProfileInformation';
import ProfileStory from '../utils/Profile/Story/ProfileStory';
import ProfileLinks from '../utils/Profile/Links/ProfileLinks';
import Container from '../components/UI/Container';
import ProfilePicture from '../utils/Profile/ProfilePicture/ProfilePicture';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Friends from './Friends';
import classes from '../css/Profile.module.css';

const Profile = () => {
  const windowCtx = useContext(WindowContext);
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);

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

  const createPostHandler = () => {
    setNewPost((prev) => !prev);
  };

  const getInformation = () => {
    sendRequest(
      `user/information?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setInformation
    );
  };

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
    setUserPosts(transformedData);
  };

  const getUserPosts = () => {
    sendRequest(
      `user/posts?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      transformPost
    );
  };

  const posts =
    userPosts.length &&
    userPosts
      .map((post) => {
        return (
          <Post
            user_id={post.user_id}
            username={post.username}
            fname={post.fname}
            lname={post.lname}
            profile={post.profile}
            post_id={post.post_id}
            timedate={post.timedate}
            content={post.content}
            reactions={reactions}
            key={new Date(post.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => b.key - a.key);

  useEffect(() => {
    getInformation();
    getUserPosts();
  }, []);
  return (
    <>
      <Container className='profile'>
        <div className={classes['left-side']}>
          <div className={classes['user-id']}>
            <ProfilePicture information={information.profile} />
            <span className={classes.username}>
              {information.fname} {information.lname}
            </span>
          </div>
          <ProfileInformation information={information} />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={information.story} />
          {/* <ProfileLinks links={information} /> */}
        </div>
        <Friends />
      </Container>

      <Container className='posts'>
        <button
          className={classes['create-post-btn']}
          onClick={createPostHandler}
        >
          Create a new post
        </button>
        {newPost && (
          <AddPost
            information={information}
            closePostHandler={createPostHandler}
          />
        )}
        {posts.length > 0 && posts}
      </Container>
      {isLoading && <SpinnerLoading color='dark' />}
      {isError !== null && <Error message={isError} />}
    </>
  );
};
export default Profile;
