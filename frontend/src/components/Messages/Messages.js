import React, { useState } from 'react';
import Container from '../UI/Container/Container';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatForm from './ChatForm/ChatForm';
import Conversation from './Conversation/Conversation';
import MessageCard from './MessageCard/MessageCard';
import './Messages.css';

function Messages() {
  // const [receiverUser, setReceiverUser] = React.useState({
  //   name: 'mariam maged',
  //   profile: './images/mrym.png',
  //   messages: [
  //     {
  //       time: '12:16:10 AM',
  //       message: 'Who are you!!?'
  //     },
  //     {
  //       time: '12:17:40 AM',
  //       message:
  //         'shshshsh i dont asking about your fuckin story.. i asked about why you texting me!?'
  //     },
  //     {
  //       time: '12:17:50 AM',
  //       message: 'No I hate you. bye'
  //     }
  //   ]
  // });
  // const [senderUser, setSenderUser] = React.useState({
  //   name: 'adham ashraf',
  //   profile: './images/profile.jpg',
  //   messages: [
  //     {
  //       time: '12:15:20 AM',
  //       message: 'Hellooooooooooooooo'
  //     },
  //     {
  //       time: '12:17:30 AM',
  //       message: 'I am adham. Iam a student ..'
  //     },
  //     {
  //       time: '12:17:45 AM',
  //       message: 'I love youu ❤️'
  //     },
  //     {
  //       time: '12:18:01 AM',
  //       message: 'I cant stop loving youu .. ❤️'
  //     }
  //   ]
  // });

  const [receiverUser, setReceiverUser] = useState({
    username: 'mariam maged',
    profile: './images/mrym.png',
    messages: [
      {
        time: 'Tue Sep 20 2022 04:31:32 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      },
      {
        time: 'Tue Sep 20 2022 04:32:37 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      },
      {
        time: 'Tue Sep 20 2022 04:32:45 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      }
    ]
  });
  const [senderUser, setSenderUser] = React.useState({
    username: 'adham ashraf',
    profile: './images/profile.jpg',
    messages: [
      {
        time: 'Tue Sep 20 2022 04:31:31 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      },
      {
        time: 'Tue Sep 20 2022 04:32:35 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      },
      {
        time: 'Tue Sep 20 2022 04:32:41 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      },
      {
        time: 'Tue Sep 20 2022 04:36:31 GMT+0200 (Eastern European Standard Time)',
        message: 'Hellooooooooooooooo'
      }
    ]
  });

  const addMessageHandler = (e) => {
    setSenderUser(prev => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          e          
        ]
      }
    });
  };
  const receiver = receiverUser.messages.map((msg) => {
    return (
      <MessageCard
        className='receiver'
        profile={receiverUser.profile}
        message={msg.message}
        time={msg.time}
        key={new Date(msg.time).getTime()}
      />
    );
  });

  const sender = senderUser.messages.map((msg) => {
    return (
      <MessageCard
        className='sender'
        profile={senderUser.profile}
        message={msg.message}
        time={msg.time}
        key={new Date(msg.time).getTime()}
      />
    );
  });
  const final = [...sender, ...receiver].sort((a, b) => a.key - b.key);

  return (
    <Container className='chat'>
      <ChatHeader username={receiverUser.username} />
      <Conversation>
        {final}
        {/* <p id='error'>
          Mariam closed the conversation. <a href='#'>learn more</a>
        </p> */}
      </Conversation>
      <ChatForm addMessageHandler={addMessageHandler}/>
    </Container>
  );
}
export default Messages;
