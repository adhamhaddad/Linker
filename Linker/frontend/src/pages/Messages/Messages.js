import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import Container from '../../components/UI/Container/Container';
import ChatUsers from './ChatUsers/ChatUsers';
import ChatHeader from './ChatHeader/ChatHeader';
import Conversation from './Conversation/Conversation';
import ChatForm from './ChatForm/ChatForm';
import MessageCard from './MessageCard/MessageCard';
import SpinnerLoading from '../../components/Loading/Spinner';
import Error from '../../components/Error';
import classes from './Messages.module.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();
  const [currentChat, setCurrentChat] = useState({
    username: 'Simba',
    fname: 'Mohamed',
    lname: 'Khaled'
  });

  const addNewMessageHandler = (newMesasge) => {
    sendRequest('http://192.168.1.6:8000/user/message', 'POST', {
      user_id: '4e6f76d8-3991-4a9f-a3fe-c9d0d94ba5bd',
      receiver_id: 'e9ab5bff-a902-4527-9bdb-90f73bcb5d44',
      content: newMesasge.current.value
    });
  };

  // Get All Messages
  useEffect(() => {
    sendRequest(
      'user/messages?user_id=4e6f76d8-3991-4a9f-a3fe-c9d0d94ba5bd&receiver_id=e9ab5bff-a902-4527-9bdb-90f73bcb5d44',
      'GET',
      {},
      setMessages
    );
  }, []);

  const conversationMessages =
    messages.length &&
    messages.map((msg) => {
      return (
        <MessageCard
          className='receiver'
          profile={msg.profile}
          message={msg.content}
          time={msg.timedate}
          key={new Date(msg.timedate).getTime()}
        />
      );
    });
  // const receiver = receiver.messages.map((msg) => {
  //   return (
  //     <MessageCard
  //       className='receiver'
  //       profile={props.receiver.profile}
  //       message={msg.message}
  //       time={msg.time}
  //       key={new Date(msg.time).getTime()}
  //     />
  //   );
  // });

  // const sender = sender.messages.map((msg) => {
  //   return (
  //     <MessageCard
  //       className='sender'
  //       profile={props.sender.profile}
  //       message={msg.message}
  //       time={msg.time}
  //       lang={msg.lang}
  //       key={new Date(msg.time).getTime()}
  //     />
  //   );
  // });
  // const final = [...sender, ...receiver].sort((a, b) => a.key - b.key);
  return (
    <Container className='chat'>
      <ChatUsers username='Beso' fname='Ahmed' lname='Emad' />
      <div className={classes.conversation}>
        <ChatHeader
          username={currentChat.username}
          fname={currentChat.fname}
          lname={currentChat.lname}
        />
        <Conversation>
          {isError !== null && <Error message={isError} />}
          {isLoading && <SpinnerLoading color='dark' />}
          {messages.length > 0 && conversationMessages}
          {messages.length === 0 && isLoading === false && isError === null && (
            <p className={classes.hint}>Chat is empty</p>
          )}
          {/* <p>Conversation started at ... End-To-End Encryption</p> */}
        </Conversation>
        <ChatForm addNewMessageHandler={addNewMessageHandler} />
      </div>
    </Container>
  );
};
export default Messages;
