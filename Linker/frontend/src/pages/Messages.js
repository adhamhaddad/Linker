import React, { useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import WindowContext from '../store/windowSize';
import AuthenticateContext from '../utils/authentication';
import Container from '../components/UI/Container';
import ChatUsers from './Messages/ChatUsers/ChatUsers';
import Conversation from './Messages/Conversation/Conversation';

const Messages = () => {
  const windowCtx = useContext(WindowContext);
  const authCtx = useContext(AuthenticateContext);
  const [currentChat, setCurrentChat] = useState({});

  return (
    <Container className='chat'>
      <ChatUsers user_id={authCtx.user.user_id} onChangeChat={setCurrentChat} />
      <Route
        path={`/messages/:username`}
        exact
      >
        <Conversation
          user_id={authCtx.user.user_id}
          receiver_id={currentChat.user_id}
          receiver_fname={currentChat.fname}
          receiver_lname={currentChat.lname}
          receiver_username={currentChat.username}
        />
      </Route>
    </Container>
  );
};
export default Messages;
