import React, { useState } from 'react';
import Modal from '../Modal';
import classes from '../../css/PostContent.module.css';

function PostContent(props) {
  const [contentStatus, setContentStatus] = useState(false);
  const viewContent = () => {
    setContentStatus((prev) => (prev ? false : true));
  };

  return (
    <>
      {contentStatus && (
        <>
          <Modal onClick={viewContent}>
            {props.content.img.trim().length > 0 && (
              <img src={props.content.img} alt='content' />
            )}
          </Modal>
        </>
      )}

      <div className={classes['post-content']}>
        <p>
          {props.content.caption !== null &&
            props.content.caption.trim().length > 0 &&
            props.content.caption}
          {props.content.caption == null && 'Null for now'}
        </p>
        {props.content.img.trim().length > 0 && (
          // <img src={props.content.img} alt='content' onClick={viewContent} />
          <div onClick={viewContent} className={classes['image-content']}></div>
        )}
        {props.content.video.trim().length > 0 && (
          <video controls>
            <source src={props.content.video} onClick={viewContent} />
            content
          </video>
        )}
      </div>
    </>
  );
}
export default PostContent;
