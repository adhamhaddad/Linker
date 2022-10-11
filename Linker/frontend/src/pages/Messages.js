import React, { useState, useEffect, useContext } from 'react';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import Container from '../components/UI/Container';
import ChatUsers from './Messages/ChatUsers/ChatUsers';
import ChatHeader from './Messages/ChatHeader/ChatHeader';
import Conversation from './Messages/Conversation/Conversation';
import ChatForm from './Messages/ChatForm/ChatForm';
import MessageCard from './Messages/MessageCard/MessageCard';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import classes from '../css/Messages.module.css';

const Messages = () => {
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();
  const [messages, setMessages] = useState([]);

  const [currentChat, setCurrentChat] = useState({
    username: 'Simba',
    user_id: 'e9ab5bff-a902-4527-9bdb-90f73bcb5d44',
    fname: 'Mohamed',
    lname: 'Khaled'
  });

  // Get All Messages
  useEffect(() => {
    sendRequest(
      `user/messages?user_id=${authCtx.user.user_id}&receiver_id=${currentChat.user_id}`,
      'GET',
      {},
      setMessages
    );
  }, []);

  const conversationMessages =
    messages.length &&
    messages
      .map((msg) => {
        return (
          <MessageCard
            className='receiver'
            profile={msg.profile}
            message={msg.content}
            timedate={msg.timedate}
            key={new Date(msg.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => a.key - b.key);

  return (
    <Container className='chat'>
      <ChatUsers user_id={authCtx.user.user_id} friends={' '} />
      <div className={classes.conversation}>
        <ChatHeader
          username={currentChat.username}
          fname={currentChat.fname}
          lname={currentChat.lname}
        />
        <Conversation>
          {messages.length > 0 && conversationMessages}
          {isLoading && <SpinnerLoading color='dark' />}
          {isError !== null && <Error message={isError} />}
          {messages.length === 0 && isLoading === false && isError === null && (
            <p className={classes.hint}>Chat is empty</p>
          )}
          {/* <p>Conversation started at ... End-To-End Encryption</p> */}
        </Conversation>
        <ChatForm
          user_id={authCtx.user.user_id}
          receiver_id={currentChat.user_id}
          onAddNewMessage=''
        />
      </div>
    </Container>
  );
};
export default Messages;
