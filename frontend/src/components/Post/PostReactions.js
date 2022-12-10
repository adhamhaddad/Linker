import React from 'react';
import classes from '../../css/PostReactions.module.css';

const PostReactions = ({
  likes,
  comments,
  shares,
  onShowLikes,
  onShowComments,
  onShowShares
}) => {
  let reactionBar = <></>;

  if (likes.length > 0 || comments.length > 0 || shares.length > 0) {
    reactionBar = (
      <div className={classes['post-reactions']}>
        {likes.length > 0 && (
          <span className={classes['reactions-content']}>
            <span className='fa-solid fa-heart'></span>
            <span onClick={onShowLikes} className={classes['like-name']}>
              {likes[0].first_name} {likes[0].last_name}{' '}
              {likes.length > 1 && (
                <span onClick={onShowLikes} className={classes['other-likes']}>
                  {' '}
                  and {likes.length - 1} others
                </span>
              )}
            </span>
          </span>
        )}

        <span className={classes['reactions-content']}>
          {comments.length > 0 && (
            <span onClick={onShowComments}>{comments.length} comments</span>
          )}
          {comments.length > 0 && shares.length > 0 && (
            <span className={classes.dott}></span>
          )}
          {shares.length > 0 && (
            <span onClick={onShowShares}>{shares.length} shares</span>
          )}
        </span>
      </div>
    );
  }
  return reactionBar;
};
export default PostReactions;
