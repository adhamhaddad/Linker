import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import Post from '../components/Post/Post';
import AddPost from '../components/Post/AddPost';
import ProfileInformation from '../utils/Profile/Information/ProfileInformation';
import ProfileStory from '../utils/Profile/Story/ProfileStory';
import Container from '../components/UI/Container';
import ProfilePicture from '../utils/Profile/ProfilePicture/ProfilePicture';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Friends from './Friends';
import classes from '../css/Profile.module.css';

const Profile = ({ user_id }) => {
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const { isLoading, isError, sendRequest } = useHttp();
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postPort, setPostPort] = useState(false);
  const closePostPort = () => {
    setPostPort((prev) => !prev);
  };
  const transformNewPost = (post) => {
    return {
      ...post,
      content: {
        caption: post.caption,
        img: post.img,
        video: post.video
      }
    };
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
  const addNewPost = (data) => {
    setUserPosts((prev) => [...prev, transformNewPost(data)]);
  };
  const posts =
    userPosts.length &&
    userPosts
      .map((post) => {
        return (
          <Post
            user_id={user_id}
            post_id={post.post_id}
            post_user_id={post.user_id}
            username={post.username}
            fname={post.fname}
            lname={post.lname}
            profile={post.profile}
            timedate={post.timedate}
            content={post.content}
            key={new Date(post.timedate).getTime()}
            onDeletePost={setUserPosts}
          />
        );
      })
      .sort((a, b) => b.key - a.key);

  const getInformation = () => {
    sendRequest(
      `user/information?user_id=${query.get('user_id')}`,
      'GET',
      {},
      setInformation
    );
  };
  const getUserPosts = () => {
    sendRequest(
      `user/posts?user_id=${query.get('user_id')}`,
      'GET',
      {},
      transformPost
    );
  };
  const createNewPost = (data) => {
    sendRequest('user/posts', 'POST', data, addNewPost);
  };

  useEffect(() => {
    getInformation();
    getUserPosts();
  }, [setUserPosts]);
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
          <ProfileInformation
            work={information.work}
            relation={information.relation}
            education={information.education}
            lives={information.lives}
            information={information}
          />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={information.story} />
        </div>
        <Friends />
      </Container>

      <Container className='posts'>
        {user_id == query.get('user_id') && (
          <button
            className={classes['create-post-btn']}
            onClick={closePostPort}
          >
            Create a new post
          </button>
        )}
        {postPort && (
          <AddPost
            user_id={user_id}
            fname={information.fname}
            lname={information.lname}
            onCreatePost={createNewPost}
            onClosePost={closePostPort}
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
