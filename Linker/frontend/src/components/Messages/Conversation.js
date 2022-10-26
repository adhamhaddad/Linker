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

const Conversation = ({ user_id }) => {
  const authCtx = useContext(AuthenticateContext);
  const query = new URLSearchParams(location.search);
  const params = useParams();
  const { isLoading, isError, sendRequest } = useHttp();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const currentUserHandler = (user) => {
    setCurrentUser({ user_fname: user.first_name, user_lname: user.last_name });
  };

  const newMessageHander = (res) => {
    setMessages((prev) => [...prev, res]);
  };
  const addNewMessageHandler = (newMesasge) => {
    sendRequest(
      'user/message',
      'POST',
      {
        sender_id: authCtx.user.user_id,
        receiver_id: params.username,
        content: newMesasge.current.value
      },
      newMessageHander
    );
  };
  const conversationMessages =
    messages.length > 0 &&
    messages
      .map((msg) => {
        return (
          <MessageCard
            className={msg.sender_id === user_id ? 'sender' : 'receiver'}
            profile={msg.profile}
            message={msg.content}
            timedate={msg.timedate}
            key={new Date(msg.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => a.key - b.key);

  // Get All Messages
  useEffect(() => {
    sendRequest(`users/${params.username}`, 'GET', {}, currentUserHandler);
    sendRequest(
      `user/messages?sender_id=${user_id}&receiver_id=${params.username}`,
      'GET',
      {},
      setMessages
    );
  }, []);
  return (
    <div className={classes['chat-conversation']}>
      <ChatHeader
        receiver_id={query.get('user_id')}
        username={currentUser.user_username}
        fname={currentUser.user_fname}
        lname={currentUser.user_lname}
      />
      <div className={classes.conversation}>
        {messages.length > 0 && conversationMessages}
        {isLoading && <SpinnerLoading color='dark' />}
        {isError !== null && <Error message={isError} />}
        {messages.length === 0 && !isLoading && isError === null && (
          <p className={classes.hint}>Chat is empty</p>
        )}
        {/* <p className={classes['conversation-first-time']}>Conversation started at ... End-To-End Encryption</p> */}
        {/* <p className={classes['conversation-date']}>{new Date().getTime()}</p> */}
      </div>
      <ChatForm
        user_id={user_id}
        receiver_id={query.get('user_id')}
        onAddNewMessage={addNewMessageHandler}
      />
    </div>
  );
};
export default Conversation;
