import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import PostCard from '../components/Post/PostCard';
import ProfileInformation from '../components/ProfileInformation';
import ProfileStory from '../components/ProfileStory';
import Container from '../components/UI/Container';
import ProfilePicture from '../components/ProfilePicture';
import Friends from './Friends';
import SpinnerLoading from '../components/Loading/Spinner';
import PostBox from '../components/Post/PostBox';
import Error from '../components/Error';
import classes from '../css/Profile.module.css';

const Profile = ({ socket }) => {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [checkFriend, setCheckFriend] = useState({
    isFriend: null,
    sender_id: null,
    receiver_id: null
  });
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();

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
    sendRequest(`users?username=${params.username}`, 'GET', {}, setUser);
  };

  const getFriends = () => {
    sendRequest(
      `user/friends?username=${params.username}`,
      'GET',
      {},
      setFriendsList
    );
  };
  // GET USER THEME
  const getUserTheme = () => {
    sendRequest(`theme?username=${params.username}`, 'GET', {}, setTheme);
  };
  const getUserPosts = () => {
    sendRequest(
      `user-posts?username=${params.username}`,
      'GET',
      {},
      transformPosts
    );
  };

  // CHECK IS FRIEND
  const checkIsFriendHandler = (data) => {
    if (data.isfriend == '1') {
      setCheckFriend({ sender_id: null, receiver_id: null, isFriend: true });
    } else if (data.isfriend == '0') {
      setCheckFriend({
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        isFriend: false
      });
    } else {
      setCheckFriend({ sender_id: null, receiver_id: null, isFriend: null });
    }
  };
  const checkIsFriend = () => {
    sendRequest(
      `friend-check?sender_id=${authCtx.user.username}&receiver_id=${params.username}`,
      'GET',
      {},
      checkIsFriendHandler
    );
  };

  // ADD FRIEND
  const friendRequest = () => {
    sendRequest(
      'add-friend',
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
      'cancel-request',
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
  const acceptRequest = () => {
    sendRequest('accept-request', 'PATCH', { sender_id: user.user_id }, null);
  };
  const newAcceptedRequest = (data) => {
    setFriendsList((prev) => [...prev, data.sender_user]);
    checkIsFriendHandler(data.result);
  };

  // REQUEST IGNORED
  const ignoreRequest = () => {
    sendRequest(
      'ignore-request',
      'DELETE',
      {
        sender_id: user.user_id,
        receiver_id: authCtx.user.user_id
      },
      null
    );
  };
  const newRequestIgnored = () => {
    setCheckFriend({ sender_id: null, receiver_id: null, isFriend: null });
  };

  // DELETE FRIEND
  const deleteFriend = (friend) => {
    sendRequest(
      'delete-friend',
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
          <PostCard
            user_id={authCtx.user.user_id}
            username={authCtx.user.username}
            first_name={authCtx.user.first_name}
            last_name={authCtx.user.last_name}
            post_id={post.post_id}
            post_profile_picture={post.profile_picture}
            post_user_id={post.user_id}
            post_username={post.username}
            post_first_name={post.first_name}
            post_last_name={post.last_name}
            post_profile={post.profile}
            post_timedate={post.timedate}
            post_content={post.content}
            socket={socket}
            key={new Date(post.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => b.key - a.key);

  useEffect(() => {
    getUser();
    getFriends();
    getUserPosts();
    getUserTheme();

    if (params.username !== authCtx.user.username) {
      checkIsFriend();
    }
    socket.on('posts', (data) => {
      if (data.action === 'CREATE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          newPostAdded(data.data);
        }
      }
      if (data.action === 'UPDATE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          newPostUpdate(data.data);
        }
      }
      if (data.action === 'DELETE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          newPostDelete(data.data);
        }
      }
    });
    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        if (
          data.data.username === params.username &&
          data.data.sender_id === authCtx.user.user_id
        ) {
          console.log(data.data);
          newFriendRequest(data.data);
        }
      }
      if (data.action === 'CANCEL_REQUEST') {
        if (
          (data.data.username === params.username &&
            data.data.receiver_id === authCtx.user.user_id) ||
          (data.data.username === params.username &&
            data.data.sender_id === authCtx.user.user_id)
        ) {
          newRequestCanceled();
        }
      }
      if (data.action === 'ACCEPT_REQUEST') {
        if (
          data.data.sender_user.user_id === authCtx.user.user_id &&
          data.data.receiver_user.username === params.username
        ) {
          newAcceptedRequest(data.data);
        }
      }
      if (data.action === 'IGNORE_REQUEST') {
        if (
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === authCtx.user.username &&
            data.data.receiver_user.username === params.username)
        ) {
          console.log(data.data);
          newRequestIgnored();
        }
      }
      if (data.action === 'DELETE_FRIEND') {
        if (
          data.data.username === params.username &&
          data.data.receiver_id === authCtx.user.user_id
        ) {
          newDeletedFriend(data.data);
        }
      }
    });
    return () => {
      setUser({});
      setTheme({});
      setFriendsList([]);
      setUserPosts([]);
    };
  }, [params]);

  return (
    <>
      <Container>
        <div
          className={classes['profile']}
          style={{
            backgroundColor:
              !isLoading && isError === null && theme.profile_cover
          }}
        >
          <section className={classes['information-section']}>
            <div className={classes['user-id']}>
              <ProfilePicture
                isLoading={isLoading}
                user_id={user.user_id}
                profile_picture={user.profile_picture}
              />
              <span className={classes.username}>
                {user.first_name} {user.last_name}
              </span>
            </div>
            {!isLoading && authCtx.user.username !== params.username && (
              <div className={classes['request-actions']}>
                {checkFriend.isFriend === true && (
                  <>
                    <Link
                      to={`/messages/${user.username}`}
                      className={`${classes['friend-actions']} ${classes['message-friend']}`}
                    >
                      <span>Message</span>
                      <i className='fa-solid fa-comment'></i>
                    </Link>
                    <button
                      className={classes['friend-actions']}
                      onClick={deleteFriend}
                    >
                      <span>Remove</span>
                      <i className='fa-solid fa-user-xmark'></i>
                    </button>
                  </>
                )}

                {checkFriend.isFriend === false &&
                  authCtx.user.user_id === checkFriend.receiver_id && (
                    <>
                      <button
                        className={classes['friend-actions']}
                        onClick={acceptRequest}
                      >
                        <span>Accept Request</span>
                        <i className='fa-solid fa-user-check'></i>
                      </button>

                      <button
                        className={classes['friend-actions']}
                        onClick={ignoreRequest}
                      >
                        <span>Ignore Request</span>
                        <i className='fa-solid fa-user-xmark'></i>
                      </button>
                    </>
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
              </div>
            )}
            {!isLoading && isError === null && (
              <ProfileInformation
                isLoading={isLoading}
                job_title={user.job_title}
                relationship={user.relationship}
                education={user.education}
                location={user.location}
              />
            )}
          </section>
          {!isLoading && isError === null && user.story !== null && (
            <section className={classes['story-section']}>
              <ProfileStory story={user.story} />
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
        </div>
      </Container>

      <Container className='posts'>
        {authCtx.user.username == params.username && <PostBox />}
        {posts.length > 0 && posts}
      </Container>
      {isLoading && <SpinnerLoading color='dark' />}
      {isError !== null && <Error message={isError} />}
    </>
  );
};
export default Profile;
