import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../../Backdrop/Backdrop';
import Overlay from '../../Overlay/Overlay';
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
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Overlay>
          <div className='create-post'>
            <div className='create-post__header'>
              <div className='create-post__user-info'>
                <img
                  src={props.photos.profile}
                  alt='profile'
                  className='profile'
                />
                <h4 className='username'>
                  {props.information.fname} {props.information.lname}
                </h4>
              </div>
              <button className='discard' onClick={props.closePostHandler}>
                discard
              </button>
            </div>

            <form onSubmit={postFormHandler}>
              <div className='create-post__content'>
                <textarea
                  type='text'
                  placeholder='What do you want to talk about?'
                  ref={caption}
                ></textarea>
                <input type='file' name='video' ref={img} />
                <input type='file' ref={video} />
              </div>

              <div className='create-post__footer'>
                <button type='submit'>Post</button>
              </div>
            </form>
          </div>
        </Overlay>,
        document.getElementById('backdrop-root')
      )}
    </>
  );
}
export default AddPost;
