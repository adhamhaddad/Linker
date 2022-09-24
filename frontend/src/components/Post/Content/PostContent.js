import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../../Backdrop/Backdrop';
import Overlay from '../../Overlay/Overlay';
import './PostContent.css';

function PostContent(props) {
  const [contentStatus, setContentStatus] = useState(false);
  const viewContent = () => {
    setContentStatus((prev) => (prev ? false : true));
  };

  return (
    <>
      {contentStatus && (
        <>
          {ReactDOM.createPortal(
            <Backdrop onClicked={viewContent} />,
            document.getElementById('backdrop-root')
          )}

          {ReactDOM.createPortal(
            <Overlay>
              {props.content.img.trim().length > 0 && (
                <img
                  src={props.content.img}
                  alt='content'
                  onClick={viewContent}
                />
              )}
            </Overlay>,
            document.getElementById('backdrop-root')
          )}
        </>
      )}

      <div className='post-content'>
        <p>
          {props.content.caption !== null &&
            props.content.caption.trim().length > 0 &&
            props.content.caption}
          {props.content.caption == null && 'Null for now'}
        </p>
        {props.content.img !== null && props.content.img.trim().length > 0 && (
          <img src={props.content.img} alt='content' onClick={viewContent} />
        )}
      </div>
    </>
  );
}
export default PostContent;
