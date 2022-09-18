import React, { useState } from 'react';
import Container from '../UI/Container/Container';
import './Messages.css';

function Messages() {
  const [status, setStatus] = useState(true);
  const [menuState, setMenuState] = useState(false);
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



  const [receiverUser, setReceiverUser] = React.useState({
      name: 'mariam maged',
      profile: './images/mrym.png',
      messages: [
        {
          time: '12:16:10 AM',
          message: 'Hellooooooooooooooo'
        },
        {
          time: '12:17:40 AM',
          message:
            'Hellooooooooooooooo'
        },
        {
          time: '12:17:50 AM',
          message: 'Hellooooooooooooooo'
        }
      ]
    });
    const [senderUser, setSenderUser] = React.useState({
      name: 'adham ashraf',
      profile: './images/profile.jpg',
      messages: [
        {
          time: '12:15:20 AM',
          message: 'Hellooooooooooooooo'
        },
        {
          time: '12:17:30 AM',
          message: 'Hellooooooooooooooo'
        },
        {
          time: '12:17:45 AM',
          message: 'Hellooooooooooooooo'
        },
        {
          time: '12:18:01 AM',
          message: 'Hellooooooooooooooo'
        }
      ]
    });



  const timeFormat = (time) => {
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    return `${hours}:${minutes} ${time.split(' ')[1]}`;
  };
  const getTime = (time) => {
    const filter = `${time.split(':')[0]}${time.split(':')[1]}${
      time.split(':')[2]
    }`;
    const final = filter.split(' ')[0];
    return Number(final);
  };

  const toggleMenu = () => {
    setMenuState((prev) => (prev ? false : true));
  };

  const receiver = receiverUser.messages.map((msg) => {
    return (
      <div className='receiver' key={getTime(msg.time)}>
        <p className='message-time'>{timeFormat(msg.time)}</p>
        <div className='message-content'>
          <img src={receiverUser.profile} alt='Profile' />
          <span>{msg.message}</span>
        </div>
      </div>
    );
  });
  const sender = senderUser.messages.map((msg) => {
    return (
      // 171640
      <div className='sender' key={getTime(msg.time)}>
        <p className='message-time'>{timeFormat(msg.time)}</p>
        <div className='message-content'>
          <img src={senderUser.profile} alt='Profile' />
          <span>{msg.message}</span>
        </div>
      </div>
    );
  });
  const final = [...sender, ...receiver].sort((a, b) => a.key - b.key);

  return (
    <Container className='chat'>
      <div className='chat-header'>
        <button>
          <i className='fa fa-arrow-circle-left'></i>
        </button>

        <h3>
          <a href='mariam'>{receiverUser.name}</a>
        </h3>

        <span className='status'>{status ? 'online' : 'offline'}</span>

        <button onClick={toggleMenu}>
          <i
            className={
              menuState
                ? 'fa-solid fa-ellipsis'
                : 'fa-solid fa-ellipsis-vertical'
            }
          ></i>
        </button>

        <ul className={`menu ${menuState && 'active'}`}>
          <li>
            <a href='#'>
              <i className='fa-solid fa-phone'></i>
              <span>call</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-bell-slash'></i>
              <span>mute</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-rectangle-xmark'></i>
              <span>close</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa-solid fa-circle-exclamation'></i>
              <span>report</span>
            </a>
          </li>
        </ul>
      </div>

      <div className='chat-conversation'>
        {final}
        {/*         
        <div className='user'>
            <img src={img} alt="Profile"/>
            <span>I cant stop loving youu .. ❤️</span>
            <img src={mrym} alt="Profile" id="seen"/>
        </div> */}

        <p id='error'>
          This user closed the conversation. <a href='#'>learn more</a>
        </p>
      </div>
      <form action='/sendMessage' method='POST'>
        <input type='text' placeholder='Type Message ..' name='message' />
        <button type='submit'>
          send
          <i className='fa fa-paper-plane'></i>
        </button>
      </form>

      {/*
      <i className='fa-solid fa-circle-check'></i>
      <i className='fa-regular fa-circle-check'></i>
      <i className='fa-regular fa-circle'></i>
      */}
    </Container>
  );
}
export default Messages;
