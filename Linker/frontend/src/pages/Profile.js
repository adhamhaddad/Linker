import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import Post from '../components/Post/Post';
import AddPost from '../components/Post/AddPost';
import ProfileInformation from '../components/ProfileInformation';
import ProfileStory from '../components/ProfileStory';
import Container from '../components/UI/Container';
import ProfilePicture from '../components/ProfilePicture';
import Friends from './Friends';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import classes from '../css/Profile.module.css';

const Profile = ({ user_id, username }) => {
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();
  const { isLoading, isError, sendRequest } = useHttp();
  const [user, setUser] = useState({});
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postPort, setPostPort] = useState(false);
  const [isFriend, setIsFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const friendsActions = (response) => {
    setFriendsList((prev) =>
      prev.filter((friend) => friend.friend_id !== response.friend_id)
    );
  };
  const onDeleteFriend = (friend) => {
    sendRequest(
      'user/delete-friend',
      'DELETE',
      { friend_id: friend.friend_id },
      friendsActions
    );
  };
  const closePostPort = () => {
    setPostPort((prev) => !prev);
  };

  const addFriend = () => {
    sendRequest(
      'user/add-friend',
      'POST',
      {
        sender_id: user_id,
        receiver_id: user.user_id
      },
      null
    );
  };

  const transformNewPost = (post) => {
    const transformedData = {
      ...post,
      user_id: user_id,
      username: username,
      first_name: user.first_name,
      last_name: user.last_name,
      content: {
        caption: post.post_caption,
        img: post.post_img,
        video: post.post_video
      }
    };
    setUserPosts((prev) => [...prev, transformedData]);
  };

  const transformPosts = (data) => {
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
    setUserPosts(transformedData);
  };

  const posts =
    userPosts.length > 0 &&
    userPosts
      .map((post) => {
        return (
          <Post
            user_id={user_id}
            username={authCtx.user.username}
            first_name={authCtx.user.first_name}
            last_name={authCtx.user.last_name}
            post_id={post.post_id}
            post_user_id={post.user_id}
            post_username={post.username}
            post_first_name={post.first_name}
            post_last_name={post.last_name}
            post_profile={post.profile}
            post_timedate={post.timedate}
            post_content={post.content}
            key={new Date(post.timedate).getTime()}
            onDeletePost={setUserPosts}
          />
        );
      })
      .sort((a, b) => b.key - a.key);
  const getUser = () => {
    sendRequest(`users/${params.username}`, 'GET', {}, setUser);
  };
  const getInformation = () => {
    sendRequest(
      `user/information/${params.username}`,
      'GET',
      {},
      setInformation
    );
  };
  const getFriends = () => {
    sendRequest(
      `user/friends?username=${params.username}`,
      'GET',
      {},
      setFriendsList
    );
  };
  const getUserPosts = () => {
    sendRequest(`user/posts/${params.username}`, 'GET', {}, transformPosts);
  };

  const createNewPost = (data) => {
    sendRequest('user/posts', 'POST', data, transformNewPost);
  };
  const checkIsFriend = (friends) => {
    return friends.map((friend) => {
      if (friend.username === username) {
        console.log('isFriend: 1');
        return;
      }
      console.log('isFriend: 0');
      return false;
    });
  };

  const cancelRequest = () => {
    console.log('Friend Request Canceled');
    sendRequest('/user/');
  };

  const removeFriend = () => {
    console.log('Friend Removed');
  };

  const requestFriendHandler = () => {
    if (isFriend === '') {
      console.log('Add Sent');
      return addFriend();
    } else if (isFriend === '0') {
      console.log('Cancel Done');
      return cancelRequest();
    } else {
      console.log('Removed');
      return removeFriend();
    }
  };

  useEffect(() => {
    getUser();
    getInformation();
    getFriends();
    getUserPosts();
  }, [params]);
  return (
    <>
      <Container className='profile'>
        <div className={classes['left-side']}>
          <div className={classes['user-id']}>
            <ProfilePicture information={information.profile} />
            <span className={classes.username}>
              {user.first_name} {user.last_name}{' '}
              {username !== params.username && !isLoading && checkIsFriend ? (
                <button
                  className={classes['add-friend']}
                  onClick={requestFriendHandler}
                >
                  Remove Friend <i className='fa-solid fa-user-xmark'></i>
                </button>
              ) : (
                <button
                  className={classes['add-friend']}
                  onClick={requestFriendHandler}
                >
                  Add Friend <i className='fa-solid fa-user-plus'></i>
                </button>
              )}
            </span>
          </div>
          <ProfileInformation
            job_title={information.job_title}
            relationship={information.relationship}
            education={information.education}
            location={information.location}
          />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={information.story} />
        </div>
        <Friends
          friendsList={friendsList}
          onDeleteFriend={onDeleteFriend}
          isLoading={isLoading}
          isError={isError}
          checkIsFriend={checkIsFriend}
        />
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
            first_name={user.first_name}
            last_name={user.last_name}
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
