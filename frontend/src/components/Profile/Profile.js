import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Post from '../Post/Post';
import AddPost from '../Post/AddPost/AddPost';
import ProfileInformation from './Information/ProfileInformation';
import ProfileStory from './Story/ProfileStory';
import ProfileLinks from './Links/ProfileLinks';
import Backdrop from '../Backdrop/Backdrop';
import Overlay from '../Overlay/Overlay';
import Container from '../UI/Container/Container';
import './Profile.css';

function Profile(props) {
  const [fPP, setFPP] = useState(false);
  const [newPost, setNewPost] = useState(false);

  const profileFullSizeHandler = () => {
    setFPP((prev) => (prev ? false : true));
  };
  const posts = props.posts.length ? (
    props.posts.map((post) => {
      return (
        <Post
          fname={props.information.fname}
          lname={props.information.lname}
          profile={props.photos.profile}
          timedate={post.timedate}
          content={post.content}
          reactions={post.reactions}
          setReactions={props.setReactions}
          key={post.id}
        />
      );
    })
  ) : (
    <p style={{ 'text-align': 'center' }}>No posts found!</p>
  );
  const createPostHandler = () => {
    setNewPost((prev) => (prev ? false : true));
  };

  return (
    <>
      {fPP && (
        <>
          {ReactDOM.createPortal(
            <Backdrop onClicked={profileFullSizeHandler} />,
            document.getElementById('backdrop-root')
          )}

          {ReactDOM.createPortal(
            <Overlay>
              <img
                src={props.photos.profile}
                alt='Profile'
                className='profile-picture'
              />
            </Overlay>,
            document.getElementById('overlay-root')
          )}
        </>
      )}

      <Container className='profile'>
        <div className='left-side'>
          <div className='user-id'>
            <img
              src={props.photos.profile}
              id='profile'
              alt='Profile'
              className='profile-picture'
              onClick={profileFullSizeHandler}
            />
            <span>
              {props.information.fname} {props.information.lname}
            </span>
          </div>
          <ProfileInformation information={props.information} />
        </div>
        <div className='right-side'>
          <ProfileStory story={props.information.story} />
          <ProfileLinks links={props.links} />
        </div>
      </Container>

      <Container>
        <button className='create-post-btn' onClick={createPostHandler}>
          Create a new post
        </button>

        {newPost && (
          <AddPost
            addNewPost={props.addNewPost}
            information={props.information}
            photos={props.photos}
            closePostHandler={createPostHandler}
          />
        )}
        {posts}
      </Container>
    </>
  );
}
export default Profile;
