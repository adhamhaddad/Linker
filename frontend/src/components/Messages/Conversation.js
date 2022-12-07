import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessageCard from './MessageCard';
import SpinnerLoading from '../Loading/Spinner';
import Error from '../Error';
import classes from '../../css/Conversation.module.css';

const Conversation = ({ socket }) => {
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { isLoading, isError, sendRequest } = useHttp();

  const currentUserHandler = (user) => {
    setCurrentUser({
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    });
  };

  const getCurrentUser = () => {
    sendRequest(
      `users?username=${params.username}`,
      'GET',
      {},
      currentUserHandler
    );
  };
  const getMessages = () => {
    sendRequest(
      `messages?sender_username=${authCtx.user.username}&receiver_username=${params.username}`,
      'GET',
      {},
      setMessages
    );
  };

  // NEW MESSAGE
  const addMessage = (newMesasge) => {
    sendRequest(
      'messages',
      'POST',
      {
        sender_username: authCtx.user.username,
        receiver_username: params.username,
        content: newMesasge.current.value
      },
      null
    );
  };
  const newMessage = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  // UPDATE MESSAGE
  const updateMessage = (data) => {
    sendRequest(
      'messages',
      'PATCH',
      {
        sender_username: authCtx.user.username,
        receiver_username: params.username,
        message_id: data.message_id,
        content: data.content
      },
      null
    );
  };
  const newUpdatedMessage = (data) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.message_id === data.message_id ? data : message
      )
    );
  };
  // DELETE MESSAGE
  const deleteMessage = (message_id) => {
    sendRequest(
      'messages',
      'DELETE',
      {
        sender_username: authCtx.user.username,
        receiver_username: params.username,
        message_id: message_id
      },
      null
    );
  };
  const newDeletedMessage = (data) => {
    setMessages((prev) =>
      prev.filter((message) => message.message_id !== data.message_id)
    );
  };

  const conversationMessages =
    messages.length > 0 &&
    messages
      .map((msg) => {
        return (
          <MessageCard
            className={
              msg.sender_id === authCtx.user.user_id ? 'sender' : 'receiver'
            }
            username={msg.username}
            profile={msg.profile_picture}
            message={msg.content}
            timedate={msg.timedate}
            key={`$${msg.message_id} ${new Date(msg.timedate).getTime()}`}
            message_id={msg.message_id}
            updateMessage={updateMessage}
            deleteMessage={deleteMessage}
          />
        );
      })
      .sort((a, b) => a.key.split(' ')[1] - b.key.split(' ')[1]);

  // Get All Messages
  useEffect(() => {
    getCurrentUser();
    getMessages();

    socket.on('messages', (data) => {
      if (data.action === 'NEW_MESSAGE') {
        if (
          (data.data.receiver_username === authCtx.user.username &&
            data.data.sender_username === params.username) ||
          (data.data.receiver_username === params.username &&
            data.data.sender_username === authCtx.user.username)
        ) {
          newMessage(data.data);
        }
      }
      if (data.action === 'UPDATE_MESSAGE') {
        newUpdatedMessage(data.data);
      }
      if (data.action === 'DELETE_MESSAGE') {
        if (
          (data.data.receiver_username === authCtx.user.username &&
            data.data.sender_username === params.username) ||
          (data.data.receiver_username === params.username &&
            data.data.sender_username === authCtx.user.username)
        ) {
          newDeletedMessage(data.data);
        }
      }
    });
    return () => {
      setCurrentUser({});
      setMessages([]);
    };
  }, [params]);

  return (
    <div className={classes['chat-conversation']}>
      <ChatHeader
        username={currentUser.username}
        first_name={currentUser.first_name}
        last_name={currentUser.last_name}
      />
      <div className={classes.conversation} id='conversation'>
        {messages.length > 0 && conversationMessages}
        {isLoading && <SpinnerLoading color='dark' />}
        {isError !== null && <Error message={isError} />}
        {messages.length === 0 && !isLoading && isError === null && (
          <p className={classes.hint}>Chat is empty</p>
        )}
        {/* <p className={classes['conversation-first-time']}>Conversation started at ... End-To-End Encryption</p> */}
        {/* <p className={classes['conversation-date']}>{new Date().getTime()}</p> */}
      </div>
      <ChatForm onAddNewMessage={addMessage} />
    </div>
  );
};
export default Conversation;
