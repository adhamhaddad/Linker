import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Post from '../Post/Post';
import AddPost from '../Post/AddPost/AddPost';
import ProfileInformation from './Information/ProfileInformation';
import ProfileStory from './Story/ProfileStory';
import ProfileLinks from './Links/ProfileLinks';
import Backdrop from '../Backdrop/Backdrop';
import Overlay from '../Overlay/Overlay';
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
    setNewPost(true);
  };
  const closePostHandler = () => {
    setNewPost(false);
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
              <img src={props.photos.profile} alt='Profile' />
            </Overlay>,
            document.getElementById('overlay-root')
          )}
        </>
      )}

      <div className='container container-flex'>
        <div className='left-side'>
          <div className='user-id'>
            <img
              src={props.photos.profile}
              id='profile'
              alt='Profile'
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
      </div>
      
      <div className='container'>
        {/*
        <button className='create-post' onClick={createPostHandler}>
          Create a new post
        </button>
        */}
        {newPost && (
          <AddPost
            addNewPost={props.addNewPost}
            information={props.information}
            photos={props.photos}
            closePostHandler={closePostHandler}
          />
        )}
        {posts}
      </div>
     
    </>
  );
}
export default Profile;
