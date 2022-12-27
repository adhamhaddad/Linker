import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import Container from '../components/UI/Container';
import ProfileInformation from '../components/Profile/ProfileInformation';
import ProfileStory from '../components/Profile/ProfileStory';
import ProfilePicture from '../components/Profile/ProfilePicture';
import ProfileName from '../components/Profile/ProfileName';
import Friends from './Friends';
import SpinnerLoading from '../components/Loading/Spinner';
import PostBox from '../components/Post/PostBox';
import Error from '../components/Error';
import Modal from '../components/Modal';
import UserCard from '../components/UserCard';
import PostCard from '../components/Post/PostCard';
import PostsList from '../components/PostsList';
import * as post from '../utils/post-utils';
import classes from '../css/Profile.module.css';

const Profile = ({ socket, windowSize }) => {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState({});
  const [visitors, setVisitors] = useState([]);
  const [visited, setVisited] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [checkFriend, setCheckFriend] = useState({
    isFriend: null,
    sender_id: null,
    receiver_id: null
  });
  const [visits, setVisits] = useState(false);
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();
  const [viewVisitors, setViewVisitors] = useState(false);

  // PROFILE REQUESTS
  const getUser = () => {
    sendRequest(`users?username=${params.username}`, 'GET', {}, setUser);
  };

  // VISITORS
  const getVisitors = () => {
    sendRequest(`visitors?username=${params.username}`, 'GET', {}, setVisitors);
  };

  // VISITED
  const getVisited = () => {
    sendRequest(`visited?username=${params.username}`, 'GET', {}, setVisited);
  };

  // FREINDS
  const getFriends = () => {
    sendRequest(
      `user/friends?username=${params.username}`,
      'GET',
      {},
      setFriendsList
    );
  };
  // THEME
  const getUserTheme = () => {
    sendRequest(`theme?username=${params.username}`, 'GET', {}, setTheme);
  };

  // POSTS
  const getUserPosts = () => {
    sendRequest(`user-posts?username=${params.username}`, 'GET', {}, (data) =>
      post.transformPosts(data, setUserPosts)
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
    checkIsFriendHandler(data.result);
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
    sendRequest(
      'accept-request',
      'PATCH',
      { sender_id: user.user_id, receiver_id: authCtx.user.user_id },
      null
    );
  };
  const newAcceptedRequest = (data) => {
    console.log(data);
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

  // CREATE VISITOR
  const createVisitor = () => {
    sendRequest(
      'visitors',
      'POST',
      {
        visitor_id: authCtx.user.user_id,
        profile_id: params.username
      },
      null
    );
  };

  const newVisitor = (data) => {
    setVisitors((prev) => {
      return prev.map((visitor) => {
        if (visitor.visitor_id === data.visitor_id) {
          return { ...visitor, ...data };
        } else if (visitor.visitor_id !== data.visitor_id) {
          return visitor;
        } else {
          return data;
        }
      });
    });
  };

  const newVisited = (data) => {
    setVisited((prev) => {
      return prev.map((user) => {
        if (user.visitor_id === data.visitor_id) {
          return { ...user, ...data };
        } else if (user.visitor_id !== data.visitor_id) {
          return user;
        } else {
          return data;
        }
      });
    });
  };

  const onVisits = () => {
    setVisits((prev) => !prev);
  };
  const onViewVisitors = () => {
    setViewVisitors((prev) => !prev);
    setVisits(false);
  };

  const visitorsList =
    visitors.length > 0 &&
    visitors
      .map((visitor) => (
        <UserCard
          key={`${visitor.visitor_id} ${new Date(visitor.timedate).getTime()}`}
          value={visitor}
        />
      ))
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  const visitedList =
    visited.length > 0 &&
    visited
      .map((user) => (
        <UserCard
          key={`${user.visitor_id} ${new Date(user.timedate).getTime()}`}
          value={user}
        />
      ))
      .sort((a, b) => b.key.split(' ')[1] - a.key.split(' ')[1]);

  const postsList =
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
            theme={theme.profile_cover}
            key={new Date(post.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => b.key - a.key);

  useEffect(() => {
    getUser();
    getUserTheme();
    getFriends();
    getUserPosts();
    getVisitors();
    getVisited();

    if (params.username !== authCtx.user.username) {
      checkIsFriend();
      createVisitor();
    }
    socket.on('posts', (data) => {
      if (data.action === 'CREATE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          post.newPostAdded(data.data, setUserPosts);
        }
      }
      if (data.action === 'UPDATE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          post.newPostUpdate(data.data, setUserPosts);
        }
      }
      if (data.action === 'DELETE_POST') {
        if (
          params.username === authCtx.user.username ||
          params.username === user.username
        ) {
          post.newPostDelete(data.data, setUserPosts);
        }
      }
    });

    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        if (
          (data.data.receiver_user.username === params.username &&
            data.data.sender_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username)
        ) {
          newFriendRequest(data.data);
        }
      }

      if (data.action === 'CANCEL_REQUEST') {
        if (
          (data.data.receiver_user.username === params.username &&
            data.data.sender_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username)
        ) {
          newRequestCanceled(data.data);
        }
      }
      if (data.action === 'ACCEPT_REQUEST') {
        if (
          (data.data.receiver_user.username === params.username &&
            data.data.sender_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username)
        ) {
          newAcceptedRequest(data.data);
        }
      }

      if (data.action === 'IGNORE_REQUEST') {
        if (
          (data.data.receiver_user.username === params.username &&
            data.data.sender_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username)
        ) {
          newRequestIgnored();
        }
      }
      if (data.action === 'DELETE_FRIEND') {
        if (
          (data.data.receiver_user.username === params.username &&
            data.data.sender_user.username === authCtx.user.username) ||
          (data.data.sender_user.username === params.username &&
            data.data.receiver_user.username === authCtx.user.username) ||
          data.data.receiver_user.username === params.username ||
          data.data.sender_user.username === params.username
        ) {
          newDeletedFriend(data.data.result);
        }
      }
    });

    socket.on('visits', (data) => {
      if (data.action === 'CREATE_VISIT') {
        if (data.data.username === params.username) {
          newVisitor(data.data);
        }
      }
      if (data.action === 'CREATE_VISIT') {
        if (data.data.username === params.username) {
          newVisited(data.data);
        }
      }
    });

    return () => {
      setUser({});
      setTheme({});
      setFriendsList([]);
      setUserPosts([]);
      setVisitors([]);
      setVisited([]);
      setViewVisitors(false);
      setVisits(false);
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
              <ProfileName
                first_name={user.first_name}
                last_name={user.last_name}
                visitors={visitors}
                onViewVisitors={onViewVisitors}
                isLoading={isLoading}
              />

              {viewVisitors && (
                <Modal>
                  <section
                    className={classes['visits-section']}
                    style={{ color: theme.profile_cover }}
                  >
                    <div className={classes['header']}>
                      <h3
                        onClick={onVisits}
                        style={{ color: !visits && 'currentcolor' }}
                      >
                        Visitors ({visitors.length})
                      </h3>
                      <h3
                        onClick={onVisits}
                        style={{ color: visits && 'currentcolor' }}
                      >
                        Visited ({visited.length})
                      </h3>
                      <button
                        className='fa-solid fa-xmark'
                        onClick={onViewVisitors}
                        style={{ backgroundColor: theme.profile_cover }}
                      ></button>
                    </div>
                    <ul>
                      {!visits && visitorsList.length > 0 && visitorsList}
                      {visits && visitedList.length > 0 && visitedList}
                    </ul>
                  </section>
                </Modal>
              )}
            </div>

            {!isLoading && authCtx.user.username !== params.username && (
              <div className={classes['request-actions']}>
                {checkFriend.isFriend === true && (
                  <>
                    <Link
                      to={
                        windowSize <= 600
                          ? `/messages/${user.username}/phone-screen`
                          : `/messages/${user.username}`
                      }
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
        {authCtx.user.username == params.username && (
          <PostBox theme={theme.profile_cover} />
        )}
        {postsList.length > 0 && (
          <PostsList posts={postsList} theme={theme.profile_cover} />
        )}
      </Container>
      {isLoading && <SpinnerLoading color='dark' theme={theme.profile_cover} />}
      {isError !== null && <Error message={isError} />}
    </>
  );
};
export default Profile;
