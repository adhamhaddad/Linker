import React, { useState, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import Modal from '../Modal';
import classes from '../../css/PostContent.module.css';

const PostContent = ({ content, post_id, isEdit }) => {
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();
  const [contentStatus, setContentStatus] = useState(false);
  const [editCaption, setEditCaption] = useState(content.caption);
  
  const viewContent = () => {
    setContentStatus((prev) => (prev ? false : true));
  };
  const onEditCaption = (e) => {
    setEditCaption(e.target.value);
  };

  const onSaveEditedPost = () => {
    sendRequest('user/post', 'PATCH', {
      user_id: authCtx.user.user_id,
      post_id: post_id,
      post_caption: editCaption,
      post_img: null,
      post_video: null
    });
  };
  return (
    <>
      {contentStatus && (
        <>
          <Modal onClick={viewContent}>
            {content.img.trim().length > 0 && (
              <img src={content.img} alt='content' />
            )}
          </Modal>
        </>
      )}

      <div className={classes['post-content']}>
        {isEdit ? (
          <textarea
            className={classes['post-textarea']}
            defaultValue={editCaption}
            onChange={onEditCaption}
          ></textarea>
        ) : (
          <>
            <p>
              {content.caption !== null &&
                content.caption.trim().length > 0 &&
                content.caption}
              {content.caption == null && 'Null for now'}
            </p>
            {content.img.trim().length > 0 && (
              <div
                onClick={viewContent}
                className={classes['image-content']}
              ></div>
            )}
            {content.video.trim().length > 0 && (
              <video controls>
                <source src={content.video} onClick={viewContent} />
                content
              </video>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default PostContent;
