import React, { useState } from 'react';
import Post from '../Post/Post';
import AddPost from '../Post/AddPost/AddPost';
import ProfileInformation from './Information/ProfileInformation';
import ProfileStory from './Story/ProfileStory';
import ProfileLinks from './Links/ProfileLinks';
import Container from '../UI/Container/Container';
import Modal from '../Modal/Modal';
import classes from './Profile.module.css';

function Profile(props) {
  const [fPP, setFPP] = useState(false);
  const [newPost, setNewPost] = useState(false);

  const profileFullSizeHandler = () => {
    setFPP((prev) => (prev ? false : true));
  };
  const posts = props.userPosts.length ? (
    props.userPosts
      .map((post) => {
        return (
          <Post
            deletePostHandler={props.deletePostHandler}
            fname={props.information.fname}
            lname={props.information.lname}
            profile={props.information.profile}
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
  const createPostHandler = () => {
    setNewPost((prev) => (prev ? false : true));
  };

  return (
    <>
      {fPP && (
        <>
          <Modal onClick={profileFullSizeHandler}>
            <img
              src={props.information.profile}
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
              src={props.information.profile}
              id='profile'
              alt='Profile'
              className={classes['profile-picture']}
              onClick={profileFullSizeHandler}
            />
            <span className={classes.username}>
              {props.information.fname} {props.information.lname}
            </span>
          </div>
          <ProfileInformation information={props.information} />
        </div>
        <div className={classes['right-side']}>
          <ProfileStory story={props.information.story} />
          <ProfileLinks links={props.information} />
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
            information={props.information}
            closePostHandler={createPostHandler}
          />
        )}
        {posts}
      </Container>
    </>
  );
}
export default Profile;
