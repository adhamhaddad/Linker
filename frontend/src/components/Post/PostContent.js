import React, { useState, useContext } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import Modal from '../Modal';
import apiUrlContext from '../../utils/api-urls';
import classes from '../../css/PostContent.module.css';

const PostContent = ({ onClick, content, post_id, isEdit }) => {
  const authCtx = useContext(AuthenticateContext);
  const { sendRequest } = useHttp();
  const [contentStatus, setContentStatus] = useState(false);
  const [editCaption, setEditCaption] = useState();
  const apiCtx = useContext(apiUrlContext);

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
    <div onClick={onClick}>
      {contentStatus && (
        <>
          {content.img !== null && content.img.trim().length > 0 && (
            <Modal onClick={viewContent}>
              <img
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${content.img}`}
                alt='Post Image'
              />
            </Modal>
          )}
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
            {content.caption !== null && content.caption.trim().length > 0 && (
              <p>{content.caption}</p>
            )}
            {content.img !== null && content.img.trim().length > 0 && (
              <div onClick={viewContent} className={classes['image-content']}>
                <img
                  src={`${apiCtx.url}/${content.img}`}
                  crossOrigin='anonymous'
                  alt='Post Image'
                />
              </div>
            )}
            {content.video !== null && content.video.trim().length > 0 && (
              <video controls>
                <source src={content.video} onClick={viewContent} />
                content
              </video>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default PostContent;
