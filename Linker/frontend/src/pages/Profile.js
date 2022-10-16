import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import Post from '../components/Post/Post';
import AddPost from '../components/Post/AddPost';
import ProfileInformation from '../components/ProfileInformation';
import ProfileStory from '../components/ProfileStory';
import Container from '../components/UI/Container';
import ProfilePicture from '../utils/Profile/ProfilePicture/ProfilePicture';
import Friends from './Friends';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import classes from '../css/Profile.module.css';

const Profile = ({ user_id, username }) => {
  const params = useParams();
  const { isLoading, isError, sendRequest } = useHttp();
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postPort, setPostPort] = useState(false);

  const closePostPort = () => {
    setPostPort((prev) => !prev);
  };

  const transformNewPost = (post) => {
    const transformedData = {
      ...post,
      user_id: user_id,
      username: username,
      fname: information.fname,
      lname: information.lname,
      content: {
        caption: post.caption,
        img: post.img,
        video: post.video
      }
    };
    setUserPosts((prev) => [...prev, transformedData]);
  };

  const transformPosts = (data) => {
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

  const posts =
    userPosts.length > 0 &&
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
      `user/information/${params.username}`,
      'GET',
      {},
      setInformation
    );
  };
  const getUserPosts = () => {
    sendRequest(`user/posts/${params.username}`, 'GET', {}, transformPosts);
  };

  const createNewPost = (data) => {
    sendRequest('user/posts', 'POST', data, transformNewPost);
  };

  useEffect(() => {
    getInformation();
    getUserPosts();
  }, [params]);
  return (
    <>
      <Container className='profile'>
        <div className={classes['left-side']}>
          <div className={classes['user-id']}>
            <ProfilePicture information={information.profile} />
            <span className={classes.username}>
              {information.fname} {information.lname}{' '}
              {username !== params.username && (
                <button className={classes['add-friend']}>
                  Add Friend <i className='fa-solid fa-user-plus'></i>
                </button>
              )}
            </span>
          </div>
          <ProfileInformation
            work={information.work}
            relation={information.relation}
            education={information.education}
            lives={information.lives}
          />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={information.story} />
        </div>
        <Friends />
      </Container>

      <Container className='posts'>
        {username == params.username && (
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
