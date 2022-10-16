import React, { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import SpinnerLoading from '../Loading/Spinner';
import Error from '../Error';
import MessageCard from './MessageCard';
import { useParams } from 'react-router-dom';
import classes from '../../css/Conversation.module.css';

const Conversation = ({ user_id }) => {
  const query = new URLSearchParams(location.search);
  const params = useParams();
  const { isLoading, isError, sendRequest } = useHttp();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    user_username: params.username,
    user_fname: '',
    user_lname: ''
  });
  console.log(query.get('user_id'))
  const currentUserHandler = (user) => {
    setCurrentUser((prev) => {
      return { prev, user_fname: user.fname, user_lname: user.lname };
    });
  };
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
            className={msg.user_id === user_id ? 'sender' : 'receiver'}
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
    sendRequest(
      `user/messages?user_id=${user_id}&receiver_id=${query.get('user_id')}`,
      'GET',
      {},
      setMessages
    );
    sendRequest(
      `user/information?user_id=${query.get('user_id')}`,
      'GET',
      {},
      currentUserHandler
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
