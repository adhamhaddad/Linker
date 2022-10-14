import React from 'react';
import { Route } from 'react-router-dom';
import Container from '../components/UI/Container';
import ChatUsers from './Messages/ChatUsers/ChatUsers';
import Conversation from './Messages/Conversation/Conversation';

const Messages = ({ user_id, windowSize }) => {
  return (
    <Container className='chat'>
      <ChatUsers user_id={user_id} windowSize={windowSize} />
      <Route path='/messages/:username' exact>
        <Conversation user_id={user_id} />
      </Route>
    </Container>
  );
};
export default Messages;
