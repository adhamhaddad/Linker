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
import openSocket from 'socket.io-client';

const Profile = ({ user_id }) => {
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();
  const [user, setUser] = useState({});
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postPort, setPostPort] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [checkFriend, setCheckFriend] = useState({
    isFriend: null,
    sender_id: null,
    receiver_id: null
  });
  const { isLoading, isError, sendRequest } = useHttp();

  const closePostPort = () => {
    setPostPort((prev) => !prev);
  };

  // TRANSFORM POSTS
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

  // PROFILE REQUESTS
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

  // CHECK IS FRIEND
  const checkIsFriendHandler = (data) => {
    if (data.isfriend == '1') {
      setCheckFriend((prev) => {
        return { ...prev, ...data, isFriend: true };
      });
    } else if (data.isfriend == '0') {
      setCheckFriend((prev) => {
        return { ...prev, ...data, isFriend: false };
      });
    } else {
      setCheckFriend((prev) => {
        return { ...prev, ...data, isFriend: null };
      });
    }
  };
  const checkIsFriend = () => {
    sendRequest(
      `user/friend-check?sender_id=${authCtx.user.username}&receiver_id=${params.username}`,
      'GET',
      {},
      checkIsFriendHandler
    );
  };

  // ADD FRIEND
  const friendRequest = () => {
    sendRequest(
      'user/add-friend',
      'POST',
      {
        sender_id: authCtx.user.user_id,
        receiver_id: user.user_id
      },
      null
    );
  };
  const newFriendRequest = (data) => {
    checkIsFriendHandler(data);
  };

  // CANCEL REQUEST
  const cancelRequest = () => {
    sendRequest(
      'user/cancel-request',
      'DELETE',
      {
        sender_id: user.user_id,
        receiver_id: authCtx.user.user_id
      },
      null
    );
  };
  const newRequestCanceled = () => {
    setCheckFriend((prev) => {
      return { ...prev, isFriend: null };
    });
  };

  // REQUEST ACCEPTED
  const newAcceptedRequest = (data) => {
    checkIsFriendHandler(data);
  };

  // REQUEST IGNORED
  const newRequestIgnored = () => {
    setCheckFriend((prev) => {
      return { ...prev, isFriend: null };
    });
  };

  // DELETE FRIEND
  const deleteFriend = (friend) => {
    sendRequest(
      'user/delete-friend',
      'DELETE',
      { sender_id: user.user_id, receiver_id: authCtx.user.user_id },
      null
    );
  };
  const newDeletedFriend = (data) => {
    setFriendsList((prev) =>
      prev.filter((friend) => friend.friend_id !== data.friend_id)
    );
    setCheckFriend((prev) => {
      return { ...prev, isFriend: null };
    });
  };

  // CREATE POST
  const createNewPost = (data) => {
    sendRequest('user/posts', 'POST', data, null);
  };
  const newPostAdded = (post) => {
    setUserPosts((prev) => {
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

  // UPDATE POST
  const newPostUpdate = (data) => {
    setUserPosts((prev) => [...prev, data]);
  };

  // DELETE POST
  const newPostDelete = (data) => {
    setUserPosts((prev) =>
      prev.filter((post) => post.post_id !== data.post_id)
    );
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
          />
        );
      })
      .sort((a, b) => b.key - a.key);

  useEffect(() => {
    getUser();
    getInformation();
    getFriends();
    getUserPosts();
    if (params.username !== authCtx.user.username) {
      checkIsFriend();
    }
    const socket = openSocket('http://192.168.1.6:4000');
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
    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        newFriendRequest(data.data);
      }
      if (data.action === 'DELETE_FRIEND') {
        newDeletedFriend(data.data);
      }
      if (data.action === 'CANCEL_REQUEST') {
        newRequestCanceled();
      }
      if (data.action === 'ACCEPT_REQUEST') {
        newAcceptedRequest(data.data);
      }
      if (data.action === 'IGNORE_REQUEST') {
        newRequestIgnored();
      }
    });
  }, [params]);

  return (
    <>
      <Container className='profile'>
        <section className={classes['information-section']}>
          <div className={classes['user-id']}>
            <ProfilePicture
              user_id={authCtx.user.user_id}
              information={information.profile}
            />
            <span className={classes.username}>
              {user.first_name} {user.last_name}
              {!isLoading && authCtx.user.username !== params.username && (
                <>
                  {checkFriend.isFriend === true && (
                    <button
                      className={classes['friend-actions']}
                      onClick={deleteFriend}
                    >
                      <span>Remove Friend</span>
                      <i className='fa-solid fa-user-xmark'></i>
                    </button>
                  )}

                  {checkFriend.isFriend === false &&
                    authCtx.user.user_id === checkFriend.receiver_id && (
                      <button
                        className={classes['friend-actions']}
                        onClick={cancelRequest}
                      >
                        <span>Ignore Request</span>
                        <i className='fa-solid fa-user-xmark'></i>
                      </button>
                    )}
                  {checkFriend.isFriend === false &&
                    authCtx.user.user_id === checkFriend.sender_id && (
                      <button
                        className={classes['friend-actions']}
                        onClick={cancelRequest}
                      >
                        <span>Cancel Request</span>
                        <i className='fa-solid fa-user-xmark'></i>
                      </button>
                    )}

                  {checkFriend.isFriend === null && (
                    <button
                      className={classes['friend-actions']}
                      onClick={friendRequest}
                    >
                      <span>Add Friend</span>
                      <i className='fa-solid fa-user-plus'></i>
                    </button>
                  )}
                </>
              )}
            </span>
          </div>
          <ProfileInformation
            job_title={information.job_title}
            relationship={information.relationship}
            education={information.education}
            location={information.location}
          />
        </section>
        {information.story !== null && (
          <section className={classes['story-section']}>
            <ProfileStory story={information.story} />
          </section>
        )}
        <section className={classes['friends-section']}>
          <Friends
            friendsList={friendsList}
            onDeleteFriend={deleteFriend}
            isLoading={isLoading}
            isError={isError}
          />
        </section>
      </Container>

      <Container className='posts'>
        {authCtx.user.username == params.username && (
          <button
            className={classes['create-post-btn']}
            onClick={closePostPort}
          >
            Create a post
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
