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
              <img
                src={props.content.img}
                alt='content'
                onClick={viewContent}
              />
            </Overlay>,
            document.getElementById('backdrop-root')
          )}
        </>
      )}

      <div className='post-content'>
        <p>{props.content.caption}</p>
        {props.content.img.length > 0 && (
          <img src={props.content.img} alt='content' onClick={viewContent} />
        )}
      </div>
    </>
  );
}
export default PostContent;
