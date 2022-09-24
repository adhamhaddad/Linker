import React from 'react';
import Container from '../UI/Container/Container';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatForm from './ChatForm/ChatForm';
import Conversation from './Conversation/Conversation';
import MessageCard from './MessageCard/MessageCard';
import './Messages.css';

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

  return (
    <Container className='chat'>
      <ChatHeader username={props.receiver.username} />
      <Conversation>
        {/* <p>Conversation started at ... End-To-End Encryption</p> */}
        {final}
        </Conversation>
      <ChatForm addNewMessageHandler={props.addNewMessageHandler} />
    </Container>
  );
}
export default Messages;
