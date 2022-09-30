import React from 'react';
import Container from '../UI/Container/Container';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatForm from './ChatForm/ChatForm';
import Conversation from './Conversation/Conversation';
import MessageCard from './MessageCard/MessageCard';
import classes from './Messages.module.css';

function Messages(props) {
  const receiver = props.receiver.messages.map((msg) => {
    return (
      <MessageCard
        className='receiver'
        profile={props.receiver.profile}
        message={msg.message}
        time={msg.time}
        key={new Date(msg.time).getTime()}
      />
    );
  });

  const sender = props.sender.messages.map((msg) => {
    return (
      <MessageCard
        className='sender'
        profile={props.sender.profile}
        message={msg.message}
        time={msg.time}
        lang={msg.lang}
        key={new Date(msg.time).getTime()}
      />
    );
  });
  const final = [...sender, ...receiver].sort((a, b) => a.key - b.key);
  const messageCardHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container className='chat'>
      <div className={classes['chat-users']}>
        <ul className={classes['users-list']}>
          <li>
            <a href='#' className={classes['user-card']} onClick={messageCardHandler}>
              <img
                src='./images/beso.jpg'
                className={classes.profile}
                alt='profile'
              />
              <div className={classes['content']}>
                <span className={classes.username}>Ahmed Emad</span>
                <p className={classes.message}>Call me later</p>
              </div>
              <div className={classes.time}>19 m</div>
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.conversation}>
        <ChatHeader username={props.receiver.username} />
        <Conversation>
          {/* <p>Conversation started at ... End-To-End Encryption</p> */}
          {final}
        </Conversation>
        <ChatForm addNewMessageHandler={props.addNewMessageHandler} />
      </div>
    </Container>
  );
}
export default Messages;
