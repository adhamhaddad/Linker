import React, { useState, useEffect, useCallback, useContext } from 'react';
import Post from '../../components/Post/Post';
import AddPost from '../../components/Post/AddPost/AddPost';
import ProfileInformation from './Information/ProfileInformation';
import ProfileStory from './Story/ProfileStory';
import ProfileLinks from './Links/ProfileLinks';
import Container from '../../components/UI/Container/Container';
import Modal from '../../components/Modal/Modal';
import Authenticate from '../../Authentication/auth';
import classes from './Profile.module.css';

function Profile(props) {
  const ctx = useContext(Authenticate);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [information, setInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [fPP, setFPP] = useState(false);

  const profileFullSizeHandler = () => {
    setFPP((prev) => (prev ? false : true));
  };
  const createPostHandler = () => {
    setNewPost((prev) => (prev ? false : true));
  };
  const deletePostHandler = async (e) => {
    await fetch('http://192.168.1.6:3000/user/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    });
    console.log(JSON.stringify(e));
  };
  console.log(ctx.user);
  const getInformation = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch('http://192.168.1.6:3000/user/information', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ctx.user.user_id })
      });
      if (!response.ok) {
        throw new Error('Could not get the user information');
      }
      const data = await response.json();
      setInformation(data.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('http://192.168.1.6:3000/user/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ctx.user.user_id })
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      const transformPost = await data.data.map((post) => {
        return {
          id: post.post_id,
          timedate: post.timedate,
          content: {
            caption: post.caption,
            img: post.img,
            video: post.video
          },
          user_id: post.user_id
        };
      });
      setUserPosts(transformPost);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getInformation();
    getUserPosts();
  }, [getInformation, getUserPosts]);

  const posts = userPosts.length ? (
    userPosts
      .map((post) => {
        return (
          <Post
            deletePostHandler={deletePostHandler}
            fname={information.fname}
            lname={information.lname}
            profile={information.profile}
            reactions={props.reactions}
            setReactions={props.setReactions}
            id={post.id}
            timedate={post.timedate}
            content={post.content}
            key={new Date(post.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => b.key - a.key)
  ) : (
    <p style={{ textAlign: 'center' }}>No posts found!</p>
  );

  return (
    <>
      {fPP && (
        <>
          <Modal onClick={profileFullSizeHandler}>
            <img
              src={information.profile}
              alt='Profile'
              className='profile-picture'
            />
          </Modal>
        </>
      )}

      <Container className='profile'>
        <div className={classes['left-side']}>
          <div className={classes['user-id']}>
            <img
              src={information.profile}
              id='profile'
              alt='Profile'
              className={classes['profile-picture']}
              onClick={profileFullSizeHandler}
            />
            <span className={classes.username}>
              {information.fname} {information.lname}
            </span>
          </div>
          <ProfileInformation information={information} />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={information.story} />
          <ProfileLinks links={information} />
        </div>
      </Container>

      <Container className='profile-feed'>
        <button
          className={classes['create-post-btn']}
          onClick={createPostHandler}
        >
          Create a new post
        </button>

        {newPost && (
          <AddPost
            addNewPost={props.addNewPost}
            information={information}
            closePostHandler={createPostHandler}
          />
        )}
        {posts}
      </Container>
    </>
  );
}
export default Profile;
