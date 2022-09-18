import React from 'react';
import './Reactions.css';

function Reactions(props) {
  let dott = <></>;
  let reactionBar = <></>;

  if (
    props.reactions.comments.length !== 0 &&
    props.reactions.shares.length !== 0
  ) {
    dott = (
      <span>
        <i className='fa-solid fa-circle period'></i>
      </span>
    );
  }

  if (
    props.reactions.likes.length !== 0 &&
    props.reactions.comments.length !== 0 &&
    props.reactions.shares.length !== 0
  ) {
    reactionBar = (
      <div className='post-reactions'>
        <p onClick={props.showLikesHandler}>
          {props.reactions.likes.length > 0 && (
            <>
              <img src='./images/reactions/like.png' />
              <span>
                {
                  props.reactions.likes[props.reactions.likes.length - 1]
                    .username
                }{' '}
                {props.reactions.likes.length > 1 && (
                  <span>and {props.reactions.likes.length - 1} others</span>
                )}
              </span>
            </>
          )}
        </p>

        <p>
          {props.reactions.comments.length > 0 && (
            <span onClick={props.showCommentsHandler}>
              {props.reactions.comments.length} comments
            </span>
          )}
          {dott}
          {props.reactions.shares.length > 0 && (
            <span onClick={props.showSharesHandler}>
              {props.reactions.shares.length} shares
            </span>
          )}
        </p>
      </div>
    );
  }
  return reactionBar;
}
export default Reactions;
