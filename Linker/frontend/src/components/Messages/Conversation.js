import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import SpinnerLoading from '../Loading/Spinner';
import Error from '../Error';
import MessageCard from './MessageCard';
import { useParams } from 'react-router-dom';
import classes from '../../css/Conversation.module.css';

const Conversation = ({socket}) => {
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

  // NEW MESSAGE
  const newMessageHander = (res) => {
    setMessages((prev) => [...prev, res]);
  };

  const addNewMessage = (newMesasge) => {
    sendRequest(
      'user/message',
      'POST',
      {
        sender_id: authCtx.user.user_id,
        receiver_id: params.username,
        content: newMesasge.current.value
      },
      null
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
            profile={msg.profile}
            message={msg.content}
            timedate={msg.timedate}
            key={`$${msg.message_id} ${new Date(msg.timedate).getTime()}`}
            message_id={msg.message_id}
          />
        );
      })
      .sort((a, b) => a.key.split(' ')[1] - b.key.split(' ')[1]);

  // Get All Messages
  useEffect(() => {
    sendRequest(`users/${params.username}`, 'GET', {}, currentUserHandler);
    sendRequest(
      `user/messages?sender_id=${authCtx.user.user_id}&receiver_id=${params.username}`,
      'GET',
      {},
      setMessages
    );

    socket.on('messages', (data) => {
      if (data.action === 'NEW_MESSAGE') {
        newMessageHander(data.data);
      }
      if (data.action === 'UPDATE_MESSAGE') {
        newMessageHander(data.data);
      }
      if (data.action === 'DELETE_MESSAGE') {
        newMessageHander(data.data);
      }
    });
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
      <ChatForm onAddNewMessage={addNewMessage} />
    </div>
  );
};
export default Conversation;
