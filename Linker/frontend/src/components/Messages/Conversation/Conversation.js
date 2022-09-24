import React from 'react';
import classes from './Conversation.module.css';

function Conversation(props) {
  return <div className={classes['chat-conversation']}>{props.children}</div>;
}
export default Conversation;
