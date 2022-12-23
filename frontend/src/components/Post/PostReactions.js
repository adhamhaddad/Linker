import React from 'react';
import classes from '../../css/PostReactions.module.css';

const PostReactions = ({
  likesList,
  commentsList,
  sharesList,
  onShowLikes,
  onShowComments,
  onShowShares
}) => {
  return (
    <div className={classes['post-reactions']}>
      {likesList.length > 0 && (
        <span className={classes['reactions-content']}>
          <span className={`fa-solid fa-heart ${classes['like-heart']}`}></span>
          <span onClick={onShowLikes} className={classes['like-name']}>
            {likesList[0].first_name} {likesList[0].last_name}{' '}
            {likesList.length > 1 && (
              <span onClick={onShowLikes} className={classes['other-likes']}>
                {' '}
                and {likesList.length - 1} others
              </span>
            )}
          </span>
        </span>
      )}

      <span className={classes['reactions-content']}>
        {commentsList.length > 0 && (
          <span onClick={onShowComments}>{commentsList.length} comments</span>
        )}
        {commentsList.length > 0 && sharesList.length > 0 && (
          <span className={classes.dott}></span>
        )}
        {sharesList.length > 0 && (
          <span onClick={onShowShares}>{sharesList.length} shares</span>
        )}
      </span>
    </div>
  );
};
export default PostReactions;
