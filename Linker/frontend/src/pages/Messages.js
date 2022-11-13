import React from 'react';
import { Route } from 'react-router-dom';
import Container from '../components/UI/Container';
import ChatUsers from '../components/Messages/ChatUsers';
import Conversation from '../components/Messages/Conversation';

const Messages = ({ user_id, windowSize, socket }) => {
  return (
    <Container className='chat'>
      <ChatUsers user_id={user_id} windowSize={windowSize} socket={socket} />
      <Route path='/messages/:username' exact>
        <Conversation user_id={user_id} socket={socket} />
      </Route>
    </Container>
  );
};
export default Messages;
