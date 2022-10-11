import React from 'react';
import classes from './Reactions.module.css';

const Reactions = ({
  reactions,
  onShowLikes,
  onShowComments,
  onShowShares
}) => {
  let reactionBar = <></>;

  if (
    reactions.likes.length > 0 ||
    reactions.comments.length > 0 ||
    reactions.shares.length > 0
  ) {
    reactionBar = (
      <div className={classes['post-reactions']}>
        {reactions.likes.length > 0 && (
          <span className={classes['reactions-content']}>
            <span className={classes['like-icon']}></span>
            <span onClick={onShowLikes}>
              {reactions.likes[reactions.likes.length - 1].username}{' '}
            </span>
            {reactions.likes.length > 1 && (
              <span onClick={onShowLikes}>
                and {reactions.likes.length - 1} others
              </span>
            )}
          </span>
        )}

        <span className={classes['reactions-content']}>
          {reactions.comments.length > 0 && (
            <span onClick={onShowComments}>
              {reactions.comments.length} comments
            </span>
          )}
          {reactions.comments.length > 0 && reactions.shares.length > 0 && (
            <span className={classes.dott}></span>
          )}
          {reactions.shares.length > 0 && (
            <span onClick={onShowShares}>{reactions.shares.length} shares</span>
          )}
        </span>
      </div>
    );
  }
  return reactionBar;
};
export default Reactions;
