import React, { useRef } from 'react';
import './AddPost.css';

function AddPost(props) {
  const caption = useRef();
  const img = useRef();
  const video = useRef();

  const postFormHandler = (e) => {
    e.preventDefault();
    const captionValue = caption.current.value;
    const imgValue = img.current.value;
    const videoValue = video.current.value;
    if (captionValue.trim().length == 0) {
      return;
    }
    props.addNewPost({
      id: new Date().getTime(),
      content: { caption: captionValue, img: imgValue, video: videoValue },
      timedate: new Date(),
      reactions: {
        likes: [],
        comments: [],
        shares: []
      }
    });

    props.closePostHandler();
  };
  return (
    <>
      <div className='layer'>
        <div className='create-post'>
          <div className='header'>
            <img src={props.photos.profile} alt='profile' className='profile' />
            <h4 className='username'>
              {props.information.fname} {props.information.lname}
            </h4>
            <button className='discard' onClick={props.closePostHandler}>
              discard
            </button>
          </div>
          <form onSubmit={postFormHandler}>
            <div className='content'>
              <textarea
                type='text'
                placeholder='What do you want to talk about?'
                ref={caption}
              ></textarea>
              <input type='file' name='video' ref={img} />
              <input type='file' ref={video} />
            </div>
            <div className='footer'>
              <button type='submit'>Post</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddPost;
