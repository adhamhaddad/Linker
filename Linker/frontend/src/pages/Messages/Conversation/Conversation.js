import React, { useEffect, useState } from 'react';
import useHttp from '../../../hooks/use-http';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatForm from '../ChatForm/ChatForm';
import SpinnerLoading from '../../../components/Loading/Spinner';
import Error from '../../../components/Error';
import MessageCard from '../MessageCard/MessageCard';
import classes from './Conversation.module.css';

const Conversation = ({
  user_id,
  receiver_username,
  receiver_fname,
  receiver_lname,
  receiver_id
}) => {
  const query = new URLSearchParams(location.search);
  const { isLoading, isError, sendRequest } = useHttp();
  const [messages, setMessages] = useState([]);

  const newMessageHander = (res) => {
    setMessages((prev) => [...prev, res]);
  };

  const addNewMessageHandler = (newMesasge) => {
    sendRequest(
      'user/message',
      'POST',
      {
        user_id: user_id,
        receiver_id: query.get('user_id'),
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
            className={msg.user_id == user_id ? 'sender' : 'receiver'}
            profile={msg.profile}
            message={msg.content}
            timedate={new Date(msg.timedate).getTime()}
            key={msg.message_id}
          />
        );
      })
      .sort((a, b) => a.timedate - b.timedate);

  // Get All Messages
  useEffect(() => {
    sendRequest(
      `user/messages?user_id=${user_id}&receiver_id=${query.get('user_id')}`,
      'GET',
      {},
      setMessages
    );
  }, []);
  return (
    <div className={classes['chat-conversation']}>
      <ChatHeader
        username={receiver_username}
        fname={receiver_fname}
        lname={receiver_lname}
      />
      <div className={classes.conversation}>
        {messages.length > 0 && conversationMessages}
        {isLoading && <SpinnerLoading color='dark' />}
        {isError !== null && <Error message={isError} />}
        {messages.length === 0 && !isLoading && isError === null && (
          <p className={classes.hint}>Chat is empty</p>
        )}
        {/* <p>Conversation started at ... End-To-End Encryption</p> */}
      </div>
      <ChatForm
        user_id={user_id}
        receiver_id={receiver_id}
        onAddNewMessage={addNewMessageHandler}
      />
    </div>
  );
};
export default Conversation;
